/**
 * health.js — Health check route for emulator and deployment verification.
 */

const express = require('express');
const { isEmulator } = require('../config/admin');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'namerrs-api',
    emulator: isEmulator,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;