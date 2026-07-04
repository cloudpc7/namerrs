/**
 * errorHandler.js — Consistent HTTP error responses for Express API.
 */

const { logger } = require('firebase-functions');

const sendError = (res, status, code, message, retryable = false) => {
  return res.status(status).json({
    error: true,
    status,
    code,
    message,
    retryable,
  });
};

const notFoundHandler = (req, res) => {
  return sendError(
    res,
    404,
    'NOT_FOUND',
    "We couldn't find what you're looking for.",
    false
  );
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error('API error', {
    path: req.path,
    method: req.method,
    message: err.message,
    stack: err.stack,
  });

  if (err.status && err.code && err.message) {
    return sendError(res, err.status, err.code, err.message, err.retryable ?? false);
  }

  if (err.type === 'StripeCardError') {
    return sendError(res, 402, 'CARD_DECLINED', err.message, true);
  }

  if (err.type === 'StripeInvalidRequestError') {
    return sendError(res, 400, 'STRIPE_INVALID_REQUEST', err.message, false);
  }

  return sendError(
    res,
    500,
    'INTERNAL_ERROR',
    'Something went wrong on our end.',
    true
  );
};

module.exports = { sendError, notFoundHandler, errorHandler };