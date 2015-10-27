
/* global describe it */
var assert = require('assert')
var nock = require('nock')
var nodep2pool = require('../src/index.js')

describe('Bitcoin node', function () {
  describe('bitcoind', function () {
    it('getblocktemplate', function (done) {
      nodep2pool.getBlockTemplate(function (res) {
        assert.equal(3, res.result.version)
        done()
      })
    })
  })
})
