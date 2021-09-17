const express = require('express');
const SavePluginCommand = require('../../application/save_plugin/save-plugin-command');
const GetPluginCommand = require('../../application/get_plugin/get-plugin-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', async (req, res) => {
  const {name, source} = req.body;
  try {
    const command = new SavePluginCommand({name, source});
    const savePlugin = container.resolve('savePlugin');
    const response = await savePlugin.save(command);

    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.toString()});
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const command = new GetPluginCommand({id});
    const getPlugin = container.resolve('getPlugin');
    const response = await getPlugin.get(command);

    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.toString()});
  }
});


module.exports = router;
