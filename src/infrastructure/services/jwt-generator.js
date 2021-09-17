const { tokenSigner: { cryptoKey } } = require('../config/');

class JwtGenerator {
    constructor({ jwt }) {
        this.jwt = jwt;
    }

    async generate({ id }) {
        const tokenGenerated = await this.jwt.sign({ id }, cryptoKey);

        return tokenGenerated;
    }
}

module.exports = JwtGenerator;
