const express = require('express');
const SavePluginCommand = require('../../application/save_plugin/save-plugin-command');
const GetPluginCommand = require('../../application/get_plugin/get-plugin-command');
const ListPluginsCommand = require('../../application/list_plugins/list-plugins-command');
const TransferPluginCommand = require('../../application/transfer_plugin/transfer-plugin-command');
const TriggerPulseCommand = require('../../application/get_plugin/get-plugin-command');
const container = require('../../container');
const verifyToken = require('./middleware/verify-token');
const errorPublisher = container.resolve('errorPublisher');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const {name, source, isPrivate, height, width, description, triggers} = req.body;
  const {id: authenticatedId} = req.authenticatedUserId;

  try {
    const command = new SavePluginCommand({
      name,
      source,
      ownerId: authenticatedId,
      isPrivate,
      height,
      width,
      description,
      triggers,
    });
    const savePlugin = container.resolve('savePlugin');
    const response = await savePlugin.save(command);

    res.status(200).json({...response});
  } catch (err) {
    errorPublisher.setIdentity({id: authenticatedId});
    errorPublisher.emitError(err);
    res.status(500).json({error: err.toString()});
  }
});

router.put('/:id/transfer', verifyToken, async (req, res) => {
  const {id: idPlugin} = req.params;
  const {id: idToTransfer} = req.authenticatedUserId;

  try {
    const command = new TransferPluginCommand({idPlugin, idToTransfer});
    const transferPlugin = container.resolve('transferPlugin');
    await transferPlugin.transfer(command);

    res.status(200).json();
  } catch (err) {
    errorPublisher.setIdentity({id: idToTransfer});
    errorPublisher.setPluginId({id: idPlugin});
    errorPublisher.emitError(err);
    res.status(500).json({error: err.toString()});
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const command = new ListPluginsCommand({showPrivatePlugins: false});
    const listPlugins = container.resolve('listPlugins');
    const response = await listPlugins.list(command);

    res.status(200).json({...response});
  } catch (err) {
    errorPublisher.setIdentity({id: req.authenticatedUserId.id});
    errorPublisher.emitError(err);
    res.status(500).json({error: err.toString()});
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  const {id} = req.params;
  const {id: authenticatedId} = req.authenticatedUserId;

  try {
    const command = new GetPluginCommand({id, candidateOwner: authenticatedId});
    const getPlugin = container.resolve('getPlugin');
    const response = await getPlugin.get(command);

    res.status(200).json({...response});
  } catch (err) {
    errorPublisher.setIdentity({id: authenticatedId});
    errorPublisher.setPluginId({id});
    errorPublisher.emitError(err);
    res.status(500).json({error: err.toString()});
  }
});

// TODO: SPLIT ABOVE THIS LINE
router.post('/:id/trigger/pulse', verifyToken, async (req, res) => {
  const {id: authenticatedId} = req.authenticatedUserId;
  const {name} = req.body;
  const {id} = req.params;

  try {
    const command = new TriggerPulseCommand({name, candidateOwner: authenticatedId, id});
    const triggerPulse = container.resolve('triggerPulse');
    await triggerPulse.trigger(command);

    res.status(200).send();
  } catch (err) {
    errorPublisher.setIdentity({id: authenticatedId});
    errorPublisher.setPluginId({id});
    errorPublisher.setTriggerData({type: 'pulse', name});
    errorPublisher.emitError(err);
    res.status(500).json({error: err.toString()});
  }
});

module.exports = router;
