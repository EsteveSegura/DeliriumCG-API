const express = require('express');
const GetPluginCommand = require('../../application/get_plugin/get-plugin-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const command = new GetPluginCommand({ id });
        const getPlugin = container.resolve('displayPlugin');
        const response = await getPlugin.display(command);

        res.status(200).send(response.source);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


module.exports = router;
