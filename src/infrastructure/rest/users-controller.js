const express = require('express');
const SaveUserCommand = require('../../application/save_user/save-user-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const {text} = req.body;
  try {
    const command = new SaveUserCommand({text});
    const saveUser = container.resolve('saveUser');
    const response = await saveUser.save(command);

    res.status(200).json({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

module.exports = router;
