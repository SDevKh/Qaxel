// create-order.cjs
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { db } = require('./firebaseAdmin.cjs'); // firebase-admin Firestore instance (may be undefined if not configured)
const router = express.Router();

function getRazorpay() {
  const keyId = process.env.RZP_KEY_ID;
  const keySecret = process.env.RZP_KEY_SECRET;
  if (!keyId && !process.env.OAUTH_TOKEN) {
    throw new Error('Razorpay key not configured. Set RZP_KEY_ID and RZP_KEY_SECRET in .env');
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// create order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receiptId } = req.body;
  // req.user is set by verifyFirebaseIdToken middleware in server/index.cjs
  const uid = req.user?.uid || null;
  try {
    const rzp = getRazorpay();
    const order = await rzp.orders.create({
      amount: Math.round(amount * 100), // INR => paise
      currency,
      receipt: receiptId || `rcpt_${Date.now()}`,
      payment_capture: 1,
    });
    // Optionally create a local order record in Firestore linking to the Razorpay order
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
        // attach localId for convenience
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

// verify payment (client will post payment response here)
router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, localOrderId } = req.body;
  const keySecret = process.env.RZP_KEY_SECRET;
  if (!keySecret) {
    console.error('RZP_KEY_SECRET is not set in environment; cannot verify signature');
    return res.status(500).json({ ok: false, message: 'Server not configured for Razorpay verification' });
  }
  const generated_signature = crypto
    .createHmac('sha256', keySecret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // valid payment — update Firestore / your DB
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
