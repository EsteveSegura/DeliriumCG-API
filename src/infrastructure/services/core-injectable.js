class CoreInjectable {
    get({ id, twitchUsername, source }) {
        const injectable = `<script src='https://alca.sfo2.cdn.digitaloceanspaces.com/tmijs/1.4.2/tmi.min.js'></script>
        <script>
            const client = new tmi.Client({
                channels: ['${twitchUsername}']
            });
            client.connect();
            client.on('message', (channel, tags, message, self) => {
                onTwitchMessage(tags['display-name'], message)
            });
        </script>
        <script>
            const es = new EventSource('http://localhost:3000/overlay/events/${id}');
            es.addEventListener('message', listener);
            function listener(event) {
                onMessage(event.data)
            }
        </script>`
        
        const formatCode = this._injectCodeAfterFirstScripTag(source,injectable)
        
        return formatCode;
    }

    _injectCodeAfterFirstScripTag(source, injectable){
        const splitSource = source.split('<script>')
        const allCode = `${splitSource[0]}\n${injectable}\n<script>\n${splitSource[1]}`

        return allCode
    }
}

module.exports = CoreInjectable;

