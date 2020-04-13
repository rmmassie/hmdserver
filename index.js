require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('../helpmedecide-server/db');
const user = require('../helpmedecide-server/controllers/usercontroller');
const poll = require('../helpmedecide-server/controllers/pollcontroller');
const response = require('../helpmedecide-server/controllers/responsecontroller');
const admin = require('../helpmedecide-server/controllers/admincontroller');
//test this

sequelize.sync() //{force:true}

app.use(express.json())
app.use(require('../helpmedecide-server/middleware/header'))


app.use('/user', user)
app.use(require('../helpmedecide-server/middleware/stalePoll'))
app.use('/poll', poll)
app.use('/response', response)
app.use('/admin', admin)

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on ${process.env.PORT}`)
})