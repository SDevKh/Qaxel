const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || path.join(__dirname, 'serviceAccountKey.json');
let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch (e) {
  console.warn('Could not load service account key from', serviceAccountPath, '- Firebase admin may fail until configured.');
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else if (!admin.apps.length) {
  // initialize default app (may work if running in an environment with GOOGLE_APPLICATION_CREDENTIALS set)
  try {
    admin.initializeApp();
  } catch (e) {
    // ignore
  }
}

const db = admin.firestore();
module.exports = { admin, db };
