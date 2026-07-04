/**
 * useNavActive.js — Active nav state for routes and hash anchors.
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavHash = () => {
  const location = useLocation();
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    setHash(window.location.hash);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return hash;
};

export const isNavLinkActive = (href, pathname, hash) => {
  if (href === '/') {
    return pathname === '/' && !hash;
  }

  if (href.startsWith('/#')) {
    return pathname === '/' && hash === href.slice(1);
  }

  return pathname === href;
};