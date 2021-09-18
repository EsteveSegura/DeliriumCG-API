const jwt = require('jsonwebtoken');
const { NOT_AUTHORIZED, BAD_REQUEST } = require('../http-status-code');
const { tokenSigner: { cryptoKey } } = require('../../config/');


async function verifyToken(req, res, next) {
    const { headers } = req;

    if (!headers || !headers['authorization']) {
        return res.status(BAD_REQUEST)
            .json({ message: `Authorization not present` });
    }

    const [bearer, token] = headers['authorization'].split(' ');

    if (bearer !== 'Bearer') {
        return res.status(BAD_REQUEST)
            .json({ message: 'Not bearer token' });
    }

    try {
        req.authenticatedUserId = jwt.verify(token, cryptoKey);
        next();
    } catch (err) {
        return res.status(NOT_AUTHORIZED).json({ message: 'Provided token is invalid' });
    }
}

module.exports = verifyToken;