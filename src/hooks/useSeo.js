/**
 * useSeo.js — Apply SEO title, description, canonical, and social meta from Redux content.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSeoContent } from '../redux/slices/content.slice';
import { DEFAULT_SEO } from '../constants/site.constants';
import { applySeoMeta } from '../utils/seoMeta';

export const useSeo = (routeKey, fallback = {}) => {
  const location = useLocation();
  const seo = useSelector((state) => selectSeoContent(state, routeKey));
  const pathname = fallback.pathname || location.pathname || '/';

  useEffect(() => {
    applySeoMeta({
      title: seo?.title || fallback.title || DEFAULT_SEO.title,
      description: seo?.description || fallback.description || DEFAULT_SEO.description,
      pathname,
      imagePath: fallback.imagePath,
      type: fallback.type || 'website',
    });
  }, [
    seo?.title,
    seo?.description,
    fallback.title,
    fallback.description,
    fallback.imagePath,
    fallback.type,
    pathname,
  ]);

  return seo;
};