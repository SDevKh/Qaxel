const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { db } = require('./firebaseAdmin'); 
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receiptId } = req.body;

  const uid = req.user?.uid || null;
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receiptId || `rcpt_${Date.now()}`,
      payment_capture: 1,
    });
    if (db) {
      try {
        const doc = await db.collection('orders').add({
          userId: uid,
          razorpayOrderId: order.id,
          amount: order.amount / 100,
          currency: order.currency,
          status: 'created',
          createdAt: new Date(),
        });
        order.localOrderId = doc.id;
      } catch (e) {
        console.warn('Failed to write local order to Firestore', e.message || e);
      }
    }
    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, localOrderId } = req.body;
  const generated_signature = crypto
    .createHmac('sha256', process.env.RZP_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {

    if (db) {
      try {
        if (localOrderId) {
          await db.collection('orders').doc(localOrderId).update({ status: 'paid', payment: { razorpay_order_id, razorpay_payment_id }, paidAt: new Date() });
        } else {
          // fallback: update by razorpayOrderId
          const q = await db.collection('orders').where('razorpayOrderId', '==', razorpay_order_id).limit(1).get();
          if (!q.empty) {
            const doc = q.docs[0];
            await doc.ref.update({ status: 'paid', payment: { razorpay_order_id, razorpay_payment_id }, paidAt: new Date() });
          }
        }
      } catch (e) {
        console.warn('Failed to update Firestore payment status', e.message || e);
      }
    }
    return res.json({ ok: true });
  } else {
    return res.status(400).json({ ok: false, message: 'Invalid signature' });
  }
});

module.exports = router;
// ...existing code...