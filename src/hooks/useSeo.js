/**
 * useSeo.js — Apply SEO title and meta description from Redux content.
 */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSeoContent } from '../redux/slices/content.slice';

export const useSeo = (routeKey, fallback = {}) => {
  const seo = useSelector((state) => selectSeoContent(state, routeKey));

  useEffect(() => {
    const title = seo?.title || fallback.title;
    const description = seo?.description || fallback.description;

    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [seo, fallback.title, fallback.description]);

  return seo;
};