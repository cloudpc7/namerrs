/**
 * seed-rtdb.js — Seed Realtime Database emulator with default content.
 * Run while emulators are up: npm run emulators:seed
 */

const path = require('path');
const { initializeApp, getApps } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const EMULATOR_HOST = process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000';
const PROJECT_ID = process.env.GCLOUD_PROJECT || 'namerrs';

process.env.FIREBASE_DATABASE_EMULATOR_HOST = EMULATOR_HOST;

if (getApps().length === 0) {
  initializeApp({
    projectId: PROJECT_ID,
    databaseURL: `http://${EMULATOR_HOST}?ns=${PROJECT_ID}-default-rtdb`,
  });
}

const seedPath = path.join(
  __dirname,
  '..',
  '..',
  'emulator-data',
  'database_export',
  'namerrs-default-rtdb.json'
);

// eslint-disable-next-line import/no-dynamic-require, global-require
const seedData = require(seedPath);

const db = getDatabase();

db.ref()
  .set(seedData)
  .then(() => {
    console.log('Realtime Database emulator seeded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed Realtime Database emulator:', error.message);
    process.exit(1);
  });