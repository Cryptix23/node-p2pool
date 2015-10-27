
/* global describe it */
var assert = require('assert')
var nock = require('nock')
var nodep2pool = require('../src/index.js')

function nock_bitcoind (method) {
  if (method === 'getnetworkinfo') {
    nock('http://localhost:8332')
    .post('/', {'method': 'getnetworkinfo', 'params': [], 'id': '1'})
    .replyWithFile(200, __dirname + '/nocks/getnetworkinfo.json')
  }
  if (method === 'getbalance1') {
    nock('http://localhost:8332')
    .post('/', {'method': 'getbalance', 'params': [], 'id': '1'})
    .replyWithFile(200, __dirname + '/nocks/getbalance1.json')
  }
  if (method === 'getbalance2') {
    nock('http://localhost:8332')
    .post('/', {'method': 'getbalance', 'params': ['p2pool', 6], 'id': '1'})
    .replyWithFile(200, __dirname + '/nocks/getbalance2.json')
  }
  if (method === 'getblocktemplate') {
    nock('http://localhost:8332')
    .post('/', {'method': 'getblocktemplate', 'params': [{'capabilities': ['coinbasetxn', 'workid', 'coinbase/append']}], 'id': '1'})
    .replyWithFile(200, __dirname + '/nocks/getblocktemplate.json')
  }
  if (method === 'error') {
    nock('http://localhost:8332')
    .post('/', {'method': 'error', 'params': [], 'id': '1'})
    .replyWithFile(200, __dirname + '/nocks/error.json')
  }
  if (method === 'timeout') {
    nock('http://localhost:8332')
    .post('/', '*')
    .socketDelay(2000) // 2 seconds
    .reply(200, '<html></html>')
  }
}

describe('Bitcoin node', function () {
  describe('bitcoind', function () {
    nock_bitcoind('getblocktemplate')
    it('getblocktemplate', function (done) {
      nodep2pool.getBlockTemplate(function (res) {
        assert.equal(3, res.result.version)
        done()
      })
    })
  })
})
