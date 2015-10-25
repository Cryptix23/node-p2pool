/* global describe it before */
var assert = require('assert')
var nock = require('nock')
var nodep2pool = require('../src/index')

describe('Bitcoin node', function () {
  before(function () {
  })

  describe('client', function () {
    it('it should be able to connect', function (done) {
      nock('http://localhost:8332')
        .filteringRequestBody(function () {
          return '*'
        })
        .post('/', '*')
        .reply(
          200, {
            result: {
              errors: ''
            },
            error: {
              code: '-32601',
              message: 'Method not found'
            }
          }
        )

      // nock.recorder.rec()

      // console.dir(nockCalls)
      nodep2pool.connect('localhost', 8332, 'bitcoinrpctest', 'moo', 'getnetworkstatus', null, function (res) {
        assert.equal('Method not found', res.error.message)
        done()
      })
    })
      // nock.recorder.play()
  })
})
