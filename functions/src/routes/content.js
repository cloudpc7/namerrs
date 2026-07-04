/**
 * content.js — Backend-driven content API (RTDB → Express → React/Redux).
 */

const express = require('express');
const { db } = require('../config/admin');
const { sendError } = require('../middleware/errorHandler');

const router = express.Router();

const readNode = async (path) => {
  const snapshot = await db.ref(path).once('value');
  return snapshot.val();
};

router.get('/', async (req, res, next) => {
  try {
    const [content, pricing] = await Promise.all([
      readNode('content'),
      readNode('config/pricing'),
    ]);

    return res.status(200).json({
      content: content || {},
      pricing: pricing || {},
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/pages/:slug', async (req, res, next) => {
  try {
    const page = await readNode(`content/pages/${req.params.slug}`);

    if (!page) {
      return sendError(
        res,
        404,
        'NOT_FOUND',
        "We couldn't find that page content.",
        false
      );
    }

    return res.status(200).json(page);
  } catch (error) {
    return next(error);
  }
});

router.get('/products/:productId', async (req, res, next) => {
  try {
    const product = await readNode(`content/products/${req.params.productId}`);

    if (!product) {
      return sendError(
        res,
        404,
        'NOT_FOUND',
        "We couldn't find that product.",
        false
      );
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
});

const normalizeSeoRouteKey = (route) => {
  const decoded = decodeURIComponent(route);
  if (decoded === '/' || decoded === 'root') {
    return 'root';
  }
  return decoded.replace(/^\//, '');
};

router.get('/seo/:route', async (req, res, next) => {
  try {
    const routeKey = normalizeSeoRouteKey(req.params.route);
    const seo = await readNode(`content/seo/${routeKey}`);

    if (!seo) {
      return sendError(
        res,
        404,
        'NOT_FOUND',
        "We couldn't find SEO content for that route.",
        false
      );
    }

    return res.status(200).json(seo);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;