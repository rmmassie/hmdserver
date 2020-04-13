const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user')
const Poll = sequelize.import('../models/poll')
const Response = sequelize.import('../models/response')

const jwt = require('jsonwebtoken');


router.post('/', function (req, res) {
    const token = req.body.token;
    let userId = jwt.decode(token, process.env.JWT_SECRET);
    userId = userId.id;
    
    User.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        Poll.findAll({
            where: {
                userId: userId
            }
        }).then(poll => {
            Response.findAll({
                where: {
                    userId: userId
                }
            }).then(response => {
                let userArray = []
                userArray.push(user),
                userArray.push(poll),
                userArray.push(response)
                console.log('Fetched Admin Data for User:',userId )
                res.send(userArray)
            }).catch(err => res.status(500).json ({
                error: err
        }))
        }).catch(err => res.status(500).json ({
            error: err
    }))
    }
    ).catch(err => res.status(500).json ({
        error: err
}))
        }
    );

module.exports = router;