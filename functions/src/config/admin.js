/**
 * admin.js — Firebase Admin SDK initialization with emulator support.
 */

const { initializeApp, getApps } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { getStorage } = require('firebase-admin/storage');

const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

if (isEmulator) {
  process.env.FIREBASE_DATABASE_EMULATOR_HOST =
    process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST =
    process.env.FIREBASE_STORAGE_EMULATOR_HOST || '127.0.0.1:9199';
  process.env.GCLOUD_PROJECT = process.env.GCLOUD_PROJECT || 'namerrs';
}

if (getApps().length === 0) {
  initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'namerrs',
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      `https://${process.env.GCLOUD_PROJECT || 'namerrs'}-default-rtdb.firebaseio.com`,
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET || 'namerrs.firebasestorage.app',
  });
}

const db = getDatabase();
const bucket = getStorage().bucket();

module.exports = { db, bucket, isEmulator };