const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Poll = sequelize.import('../models/poll')
const Response = sequelize.import('../models/response')
const jwt = require('jsonwebtoken');

//FETCH ALL RESPONSES from A GIVEN POLL
router.get('/get/:pollId', (req, res) => {
    let pollId = req.params.pollId;
    Response.findAndCountAll((
        {where: {pollId: pollId},
        attributes: ['response'], 
        group: ['response']
        }))
    .then(poll => res.status(200).json(poll))
    .catch(err => res.status(500).json ({
        error: err
}))
  
});

//SEND A USER RESPONSE INTO THE DATABASE
router.post('/:pollID/', (req, res) => {
    console.log("Poll is ", req.params.pollID)
    console.log("Vote is Option ", req.body.vote)
    let userId = jwt.decode(req.body.session, process.env.JWT_SECRET)
    try {
        Response.create({
          pollId: req.params.pollID,
          userId: userId.id,
          response: req.body.vote
        })
    }
    catch {
        res.send('There is an error with user ID: ', userId.id)
    }
    res.send({
        message: "Vote is Counted",
        user: userId.id,
        response: req.body.vote
    })
});

module.exports = router; 