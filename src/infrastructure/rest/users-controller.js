const express = require('express');
const SaveUserCommand = require('../../application/save_user/save-user-command');
const AuthUserCommand = require('../../application/auth_user/auth-user-command');
const GetUserCommand = require('../../application/get_user/get-user-command');
const container = require('../../container');
const verifyToken = require('./middleware/verify-token');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const {twitchToken} = req.body;
  try {
    const command = new SaveUserCommand({twitchToken});
    const saveUser = container.resolve('saveUser');
    const response = await saveUser.save(command);

    res.status(200).json({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.post('/auth', verifyToken, async (req, res) => {
  const {id} = req.authenticatedUserId;
  try {
    const command = new AuthUserCommand({id});
    const authUser = container.resolve('authUser');
    const response = await authUser.auth(command);

    res.status(200).send({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const command = new GetUserCommand({id});
    const getUser = container.resolve('getUser');
    const response = await getUser.get(command);

    res.status(200).send({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});
module.exports = router;

