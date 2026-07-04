/**
 * orders.js — Order creation and notification dispatch.
 */

const express = require('express');
const { logger } = require('firebase-functions');
const { db } = require('../config/admin');
const { sendError } = require('../middleware/errorHandler');

const router = express.Router();

const sanitizeText = (value, max = 200) =>
  String(value || '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, max);

const sendOrderNotifications = async (order) => {
  const email = order.customer?.email;
  const phone = order.customer?.phone;

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && phone) {
    logger.info('Twilio SMS notification queued', { phone, orderId: order.id });
  } else if (phone) {
    logger.info('Twilio not configured — SMS skipped', { phone, orderId: order.id });
  }

  if (email) {
    logger.info('Order confirmation email queued', { email, orderId: order.id });
  }
};

router.post('/', async (req, res, next) => {
  try {
    const customer = req.body?.customer || {};
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    const paymentIntentId = sanitizeText(req.body?.paymentIntentId, 120);
    const total = Number(req.body?.total ?? 0);

    const name = sanitizeText(customer.name, 80);
    const email = sanitizeText(customer.email, 120);
    const phone = sanitizeText(customer.phone, 30);
    const notes = sanitizeText(customer.notes, 500);

    if (!name || !email || !phone) {
      return sendError(
        res,
        400,
        'VALIDATION_ERROR',
        'Name, email, and phone are required.',
        false
      );
    }

    if (items.length === 0) {
      return sendError(res, 400, 'VALIDATION_ERROR', 'Cart cannot checkout empty.', false);
    }

    const orderRef = db.ref('orders').push();
    const order = {
      customer: { name, email, phone, notes },
      items,
      total: Number.isFinite(total) ? total : 0,
      paymentIntentId: paymentIntentId || null,
      status: 'confirmed',
      createdAt: Date.now(),
    };

    await orderRef.set(order);
    const orderWithId = { id: orderRef.key, ...order };

    await sendOrderNotifications(orderWithId);

    return res.status(201).json({
      order: orderWithId,
      message: 'Order confirmed. Thank you for your purchase!',
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;