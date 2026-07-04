/**
 * sessionId.js — Anonymous session identifier for cart persistence.
 */

const SESSION_KEY = 'namerrs_session_id';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const getSessionId = () => {
  if (typeof window === 'undefined') {
    return 'server';
  }

  let sessionId = window.localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = createId();
    window.localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};