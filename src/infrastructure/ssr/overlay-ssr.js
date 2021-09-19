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

// TODO: Split this in other controller
router.get('/events/:id', async (req, res) => {
    const {id} = req.params;
    res.setHeader('Content-Type', 'text/event-stream');
    try {
        const pubsubRedis = container.resolve('redisPubSubMessage')
        await pubsubRedis.subscribe(id);
        await pubsubRedis.listen((channelListen, message) => {
          res.write(`event: message\n`);
          res.write(`data: ${message}\n\n`);
        });
    } catch (error) {
        console.log(error)        
    }

});

module.exports = router;
