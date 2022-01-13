const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const itsme = require('_middleware/its-me');
const userService = require('../services/UserService');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.get('/current', authorize(), getCurrent);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                //res.setHeader('authorization', "Bearer " + user.token);
                res.status(200).json({'token': user.token}); 
            } else {
                res.status(401).send("Unauthorized !");
            }
        })
        .catch(error => {
            console.log("ERROR ", error);
            res.status(500).send(error);
        });
}

function getCurrent(req, res, next) {
    res.json(req.user);
}
