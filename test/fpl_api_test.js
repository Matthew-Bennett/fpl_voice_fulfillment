'use strict'

const mocha = require('mocha')
const chai = require('chai')
const fpl = require('./../fpl_api')

describe('fpl_api', () => {
  it('should fetch current gameweek', () => {
    let currenGameweek = fpl.getCurrentGameweek().then(() => {
      chai.expect(currenGameweek).to.deep.equal('11')
    })
  })
})