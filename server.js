'use strict'

require('dotenv').config()
const express = require('express')
const { dialogflow } = require('actions-on-google')

const fpl = require('./fpl_api')

const app = express()
const dialogFlow = dialogflow()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.status(200).send('FPL Voice Fullfillment')
})

app.get('/gameweek', (req, res) => {
  fpl.getCurrentGameweek().then(gameweek => {
    res.status(200).send({gameweek})
  })
})

app.get('/points/:id', (req, res) => {
  let id = req.params.id
  fpl.getPoints(id).then(points => {
    res.status(200).send({points})
  })
})

dialogFlow.intent('Default Welcome Intent', conv => {
  conv.ask(`Hi Matt, i'm your Fantasy Premier League voice assistant. How can I help?`)
})

dialogFlow.intent('Team Points', conv => {
  fpl.getPoints(3513).then(points => {
    conv.ask(`You currently have ${points} points`)
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})