/**
 * reviews.js — Reviews API (list and submit).
 */

const express = require('express');
const { db } = require('../config/admin');
const { sendError } = require('../middleware/errorHandler');

const router = express.Router();

const sanitizeText = (value) =>
  String(value || '')
    .replace(/<[^>]*>/g, '')
    .trim();

router.get('/', async (req, res, next) => {
  try {
    const snapshot = await db.ref('reviews').orderByChild('createdAt').limitToLast(20).once('value');
    const reviewsMap = snapshot.val() || {};
    const reviews = Object.entries(reviewsMap)
      .map(([id, review]) => ({ id, ...review }))
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return res.status(200).json({ reviews });
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const rating = Number(req.body?.rating);
    const text = sanitizeText(req.body?.text);
    const name = sanitizeText(req.body?.name).slice(0, 40);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return sendError(res, 400, 'VALIDATION_ERROR', 'A rating between 1 and 5 is required.', false);
    }

    if (text.length < 10 || text.length > 500) {
      return sendError(
        res,
        400,
        'VALIDATION_ERROR',
        'Review text must be between 10 and 500 characters.',
        false
      );
    }

    const reviewRef = db.ref('reviews').push();
    const review = {
      rating,
      text,
      name: name || 'Anonymous',
      createdAt: Date.now(),
      approved: true,
    };

    await reviewRef.set(review);

    return res.status(201).json({ id: reviewRef.key, ...review });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;