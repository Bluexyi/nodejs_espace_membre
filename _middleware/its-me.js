const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = itsme;

function itsme() {
    return [
        jwt({ secret, algorithms: ['HS256'] }),

        (req, res, next) => {
            console.log("req.params.id = ", req.params.id);
            console.log("req.user.sub = ", req.user.sub);
            if (req.params.id != req.user.sub)
                return res.status(401).json({ message: 'Unauthorized, pas moi' });

            next();
        }
    ];
}