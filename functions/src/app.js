/**
 * app.js — Express application for Namerrs Cloud Functions API.
 */

require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');

require('./config/admin');

const healthRoutes = require('./routes/health');
const contentRoutes = require('./routes/content');
const reviewsRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const ordersRoutes = require('./routes/orders');
const stripeRoutes = require('./routes/stripe');
const { stripeWebhookHandler } = require('./routes/stripe');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: true }));

// Firebase Hosting rewrites preserve the /api prefix; strip it for route handlers.
app.use((req, _res, next) => {
  if (req.url === '/api') {
    req.url = '/';
  } else if (req.url.startsWith('/api/')) {
    req.url = req.url.slice(4);
  }
  next();
});

app.post(
  '/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
);

app.use(express.json({ limit: '10mb' }));

app.use('/health', healthRoutes);
app.use('/content', contentRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/contact', contactRoutes);
app.use('/orders', ordersRoutes);
app.use('/', stripeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;