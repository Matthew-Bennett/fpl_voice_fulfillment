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

dialogFlow.intent('Default Welcome Intent', conv => {
  conv.ask(`Hi Matt, i'm your Fantasy Premier League voice assistant. How can I help?`)
})

dialogFlow.intent('Team Points', conv => {
  fpl.getPoints(3513).then(points => {
    conv.ask(`You currently have ${points} points`)
  })
})

app.listen(port)