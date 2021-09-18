const express = require('express');
const SavePluginCommand = require('../../application/save_plugin/save-plugin-command');
const GetPluginCommand = require('../../application/get_plugin/get-plugin-command');
const container = require('../../container');
const verifyToken = require('./middleware/verify-token');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const {name, source, isPrivate} = req.body;
  const {id: authenticatedId} = req.authenticatedUserId;

  try {
    const command = new SavePluginCommand({name, source, ownerId: authenticatedId, isPrivate});
    const savePlugin = container.resolve('savePlugin');
    const response = await savePlugin.save(command);

    res.status(200).json({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  const {id} = req.params;
  const {id: authenticatedId} = req.authenticatedUserId;

  try {
    const command = new GetPluginCommand({id,  candidateOwner: authenticatedId});
    const getPlugin = container.resolve('getPlugin');
    const response = await getPlugin.get(command);

    res.status(200).json({...response});
  } catch (error) {
    res.status(500).json({error: error.toString()});
  }
});


module.exports = router;
