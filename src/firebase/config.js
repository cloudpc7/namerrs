/**
 * config.js — Firebase client SDK initialization for web app.
 */

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { connectEmulators } from './emulators';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'namerrs.firebaseapp.com',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    'http://127.0.0.1:9000?ns=namerrs-default-rtdb',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'namerrs',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'namerrs.appspot.com',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:local',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

connectEmulators({ database, storage });

export { app, database, storage, firebaseConfig };