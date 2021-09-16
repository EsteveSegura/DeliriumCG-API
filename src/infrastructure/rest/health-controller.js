const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {server: {port}} = require('../config/');

router.get('/', async (req, res) => {
  try {
    res.status(200).send(`${port} OK -----`);
  } catch (error) {
    res.status(500).send('FAIL');
  }
});

module.exports = router;
