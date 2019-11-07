'use strict'

const request = require('request-promise')

let baseUrl = process.env.FPL_BASE_URL || `https://fantasy.premierleague.com/api/`

function getStatus() {
  return request({uri: `${baseUrl}bootstrap-static/`, json: true})
    .then(body =>  {
      console.log(`Got FPL status`)
      return body
  })
  .catch(err => {
    console.log(err)
    return err
  })
}

function getCurrentGameweek() {
  return new Promise((resolve, reject) => {
    getStatus().then(body => {
      let gameweeks = body.events
      let currentGameweek = 0
      gameweeks.forEach(gameweek => {
        if(gameweek.is_current){
          currentGameweek = gameweek.id
        }
      })
      resolve(currentGameweek)
    }).catch(err => {
      reject(err)
    })
  })
}

function getPoints(id) {
  return new Promise((resolve,reject) => {
    request({uri: `${baseUrl}/entry/${id}/`, json: true})
      .then(body => {
       resolve(body.summary_event_points)
      })
      .catch(err => {
        reject(err)
      })
    })
}

module.exports =  {
  getCurrentGameweek,
  getPoints
}