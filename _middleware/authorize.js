const jwt = require('jsonwebtoken');
const { secret } = require('config.json'); //TODO const SECRET_KEY = process.env.SECRET_KEY;
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        async (req, res, next) => {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (!!token && token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            if (token) {
                jwt.verify(token, secret, async (err, decoded) => {
                    console.log("DEBUG ", decoded.sub);
                    if (err) {
                        console.log("Token not valid : ", err.message);
                        return res.status(401).json('token_not_valid');
                    } else {
                        const user = await db.User.findByPk(decoded.sub);
                        if (!user){
                            return res.status(401).json({ message: 'Unauthorized' });
                        }
                        req.user = user.get();
                        res.header('Authorization', 'Bearer ' + token); 
                        next();
                    }
                });
            } else {
                return res.status(401).json('Token required');
            }
        }
    ];
}

/*
    req.decoded = decoded; // passage du payload à la requête
    const expiresIn = 24 * 60 * 60;
    const newToken = jwt.sign({
        user: decoded.user
    },
        secret,
        { expiresIn: expiresIn }
    );
    res.header('Authorization', 'Bearer ' + newToken); 
*/

