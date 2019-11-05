'use strict'

const request = require('request-promise')

const baseUrl = process.env.FPL_BASE_URI

function getCurrentGameweek() {
  request({uri: `${baseUrl}bootstrap-static/`, json: true}).then(response =>  {
    let body = response.body
    let gameweeks = body.events
    gameweeks.forEach(gameweek => {
      if(gameweek.is_current){
        return gameweek.id
      }
    })
    return 0
  })
}

function getPoints(id) {
  request({uri: `${baseUrl}/entry/${id}/`, json: true}).then(response => {
    let body = response.body
    return body.summary_event_points
  })
}

module.exports = {
  getCurrentGameweek,
  getPoints
}