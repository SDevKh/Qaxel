require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createOrderRouter = require('./create-order.cjs');
const { admin } = require('./firebaseAdmin.cjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware to verify Firebase ID token sent as Authorization: Bearer <idToken>
async function verifyFirebaseIdToken(req, res, next) {
  // Development bypass: set SKIP_AUTH=true in .env to skip token verification
  if (process.env.SKIP_AUTH === 'true') {
    req.user = { uid: 'dev-user' };
    return next();
  }
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).json({ ok: false, message: 'Missing auth token' });
  const idToken = match[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed', err);
    return res.status(401).json({ ok: false, message: 'Invalid token' });
  }
}

// Mount routes: protect create-order and verify-payment so only authenticated users can call them
app.use('/api', verifyFirebaseIdToken, createOrderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
