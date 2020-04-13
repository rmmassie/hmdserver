const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Poll = sequelize.import('../models/poll');
const Response = sequelize.import('../models/response')
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    Poll.findAll(
        {where: {},
        order: [
            ['id', 'ASC']
        ]})
    .then(poll => res.status(200).json(poll))
    .catch(err => res.status(500).json ({
        error: err
}))
})

router.post('/:pollId', (req, res) => {
    let pollId = req.params.pollId
    console.log(req.body.session)
    let userId = jwt.decode(req.body.session, process.env.JWT_SECRET)
    console.log(`Checking Prior Voting for ${userId.id} on Poll ID ${req.params.pollId}`)
    Poll.findOne(
        {
            where: {id: pollId},
        })
    .then(poll => {
        
        Response.findOne({
            where: {
                pollId: poll.dataValues.id,
                userId: userId.id
            }
        }).then(result => {
            console.log([poll.dataValues.id, result])
            res.send([poll, result])
        })
    })
    .catch(err => res.status(500).json ({
        error: err
    }))
})

router.post('/dev/:pollId', (req, res) => {
    let pollId = req.params.pollId
    console.log(req.body.session)
    let userId = jwt.decode(req.body.session, process.env.JWT_SECRET)
    console.log(`Checking Prior Voting for ${userId.id} on Poll ID ${req.params.pollId}`)
    Poll.findOne(
        {
            where: {id: pollId},
        })
    .then(poll => {
        Response.findOne({
            where: {
                pollId: poll.dataValues.id,
                }
        }).then(result => {
            res.send([poll, result])
        })
    })
    .catch(err => res.status(500).json ({
        error: err
    }))
})
// ROUTE TO POST NEW POLL
router.post('/new/newPoll', (req, res) => {
    console.log("The New Poll Request Looks Like", req.body)
    tokenInfo = jwt.decode(req.body.token, process.env.JWT_SECRET)
       
    const pollFromRequest = {
        userId: tokenInfo.id,
        //Make this a request from the list of possible polls
        typeId: 1,
        question: req.body.question,
        tags: req.body.tags,
        solution1: req.body.answer1,
        solution2: req.body.answer2,
        summary: req.body.summary,
        changedState: true
    }
    console.log("The New Pool Build-out Looks like", pollFromRequest)
    Poll.create(pollFromRequest)
    .then(poll => {
       res.status(200).json(poll)
    })
    .catch(err => res.json ({
        error: err
    }))
});

//  ROUTE FOR ACTIVE POLLS
router.get('/status/active', (req,res) => {
    Poll.findAll(
        {where: {changedState: true},
        order: [
            ['id', 'ASC']
        ]})
    .then(poll => {
        res.status(200).json(poll)
    })
    .catch(err => res.json ({
    error: err
})
)})

// ROUTES FOR CLOSED POLL
router.get('/status/closed', (req,res) => {
    let polltime = req.params.open
    Poll.findAll(
        {where: {
            changedState: false
        },
        order: [
            ['id', 'ASC']
        ]
    })
    .then(poll => res.status(200).json(poll))
    .catch(err => res.json ({
        error: err
    })
    )})

module.exports = router; 