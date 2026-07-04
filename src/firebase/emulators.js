/**
 * emulators.js — Connect Firebase client SDK to local emulators in development.
 */

import { connectDatabaseEmulator } from 'firebase/database';
import { connectStorageEmulator } from 'firebase/storage';

let emulatorsConnected = false;

const EMULATOR_HOST = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || '127.0.0.1';
const DATABASE_PORT = Number(import.meta.env.VITE_FIREBASE_DATABASE_EMULATOR_PORT || 9000);
const STORAGE_PORT = Number(import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_PORT || 9199);

export const connectEmulators = ({ database, storage }) => {
  const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

  if (!useEmulators || emulatorsConnected) {
    return;
  }

  connectDatabaseEmulator(database, EMULATOR_HOST, DATABASE_PORT, {
    disableWarnings: true,
  });
  connectStorageEmulator(storage, EMULATOR_HOST, STORAGE_PORT);

  emulatorsConnected = true;
};