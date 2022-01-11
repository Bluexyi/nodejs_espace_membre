const jwt = require('jsonwebtoken');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = itsme;

function itsme() {
    return [
        (req, res, next) => {
            console.log("req.params.id = ", req.params.id);
            console.log("req.user.sub = ", req.user);
            if (req.params.id != req.user.id){
                console.log("Unauthorized : Isn't me")
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ];
}