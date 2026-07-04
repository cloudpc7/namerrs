/**
 * index.js — Firebase Cloud Functions entry point (Express API).
 */

const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const app = require('./src/app');

setGlobalOptions({
  maxInstances: 10,
  region: 'us-central1',
});

exports.api = onRequest(
  {
    cors: true,
    memory: '512MiB',
    serviceAccount: 'firebase-adminsdk-fbsvc@namerrs.iam.gserviceaccount.com',
    timeoutSeconds: 60,
  },
  app
);