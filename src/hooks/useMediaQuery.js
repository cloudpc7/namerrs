/**
 * useMediaQuery.js — Subscribe to a CSS media query match state.
 */

import { useEffect, useState } from 'react';

export const useMediaQuery = (query, defaultValue = false) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};