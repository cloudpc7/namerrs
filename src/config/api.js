/**
 * api.js — API base URL configuration for Vite and Jest environments.
 */

// Relative /api in dev (Vite proxy) and prod (Firebase Hosting rewrite).
const DEFAULT_API_BASE_URL = '/api';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;