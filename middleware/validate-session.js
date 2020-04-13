//require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    const sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided."});
        else{
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err,decoded) => {
                if(decoded){
                    User.findOne({where: {id: decoded.id}}).then(user => {
                        req.user = user;
                        next()
                    }, function(){
                        res.status(401).send({error: "Not Authorized"});
                    });
                } else {
                    res.status(400).send({error: "Not Authorized"});
                }
            });
        }
    }

