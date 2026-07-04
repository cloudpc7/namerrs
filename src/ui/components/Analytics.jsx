/**
 * Analytics.jsx — Google Analytics 4 loader when measurement ID is configured.
 */

import { useEffect } from 'react';

const GA_ID = process.env.VITE_GA_MEASUREMENT_ID;

const Analytics = () => {
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') {
      return undefined;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default Analytics;