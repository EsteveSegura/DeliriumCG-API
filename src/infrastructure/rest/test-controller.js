const express = require('express');
const SaveTestCommand = require('../../application/save_test/save-test-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const {text} = req.body;
  try {
    const command = new SaveTestCommand({text});
    const saveTest = container.resolve('saveTest');
    const response = await saveTest.save(command);

    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.toString()});
  }
});

module.exports = router;
