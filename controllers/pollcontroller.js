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
    let userId = jwt.decode(req.headers.authorization, process.env.JWT_SECRET)
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
            res.send([poll, result])
        })
    })
    .catch(err => res.status(500).json ({
        error: err
    }))
})

router.post('/dev/:pollId', (req, res) => {
    let pollId = req.params.pollId
    let userId = jwt.decode(req.headers.authorization, process.env.JWT_SECRET)
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
    tokenInfo = jwt.decode(req.headers.authorization, process.env.JWT_SECRET)
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

router.get('/delete/:pollID', (req,res) => {
    console.log(req.params.pollID)
    Poll.destroy({where: {
        id: req.params.pollID
    }}).then(response => {
        if (response === 1) {
            console.log("Comment Executed Successfully")
            res.send(200)
        } else if (response === 0) {
            console.log("Delete Unsuccessful")
            res.send(400)

        }
        
        
    }
    ).catch(err => {
        console.log(err)
        res.status(403)
    }
        
    )
    
    
    
})

module.exports = router; 