/**
 * contact.js — Contact message API.
 */

const express = require('express');
const { db } = require('../config/admin');
const { sendError } = require('../middleware/errorHandler');

const router = express.Router();

const sanitizeText = (value) =>
  String(value || '')
    .replace(/<[^>]*>/g, '')
    .trim();

router.post('/', async (req, res, next) => {
  try {
    const name = sanitizeText(req.body?.name).slice(0, 80);
    const email = sanitizeText(req.body?.email).slice(0, 120);
    const phone = sanitizeText(req.body?.phone).slice(0, 30);
    const text = sanitizeText(req.body?.message || req.body?.text);

    if (text.length < 5 || text.length > 500) {
      return sendError(
        res,
        400,
        'VALIDATION_ERROR',
        'Message must be between 5 and 500 characters.',
        false
      );
    }

    const messageRef = db.ref('messages').push();
    const message = {
      text,
      name: name || null,
      email: email || null,
      phone: phone || null,
      createdAt: Date.now(),
      status: 'received',
    };

    await messageRef.set(message);

    return res.status(201).json({
      id: messageRef.key,
      message: "Message sent — we'll get back to you soon.",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;