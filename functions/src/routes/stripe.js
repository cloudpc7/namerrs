/**
 * stripe.js — Stripe payment routes and webhook handler (test mode + Stripe CLI).
 */

const express = require('express');
const { logger } = require('firebase-functions');
const { sendError } = require('../middleware/errorHandler');

const router = express.Router();

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    const error = new Error(
      'Stripe is not configured. Add STRIPE_SECRET_KEY to functions/.env.local'
    );
    error.status = 503;
    error.code = 'STRIPE_NOT_CONFIGURED';
    error.retryable = false;
    throw error;
  }

  // eslint-disable-next-line global-require
  return require('stripe')(secretKey);
};

const stripeWebhookHandler = async (req, res) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers['stripe-signature'];

  if (!webhookSecret) {
    logger.warn('Stripe webhook received without STRIPE_WEBHOOK_SECRET configured');
    return res.status(200).json({ received: true, verified: false });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

    logger.info('Stripe webhook verified', { type: event.type });

    if (event.type === 'payment_intent.succeeded') {
      logger.info('Payment succeeded', {
        paymentIntentId: event.data.object.id,
      });
    }

    return res.status(200).json({ received: true, verified: true });
  } catch (error) {
    logger.error('Stripe webhook verification failed', { message: error.message });
    return sendError(
      res,
      400,
      'WEBHOOK_ERROR',
      'Stripe webhook verification failed.',
      false
    );
  }
};

router.post('/create-payment-intent', async (req, res, next) => {
  try {
    const stripe = getStripe();
    const amount = Number(req.body?.amount ?? 0);
    const currency = req.body?.currency || 'usd';

    if (Number.isNaN(amount) || amount < 0) {
      return sendError(
        res,
        400,
        'VALIDATION_ERROR',
        'A valid amount is required.',
        false
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: 'namerrs-emulator',
        sessionId: req.body?.sessionId || 'guest',
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
module.exports.stripeWebhookHandler = stripeWebhookHandler;