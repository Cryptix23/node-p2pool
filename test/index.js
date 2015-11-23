
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
    .filteringRequestBody(function (body) {
      return '*'
    })
    .post('/', '*')
    .socketDelay(2000) // 2 seconds
    .reply(200, '<html></html>')
  }
}

/**
* https://en.bitcoin.it/wiki/Stratum_mining_protocol
*/
describe('Stratum server', function () {
  describe('can connect', function () {
    it('should return true')
  })

  // [[["mining.set_difficulty", "subscription id 1"], ["mining.notify", "subscription id 2"]], "extranonce1", extranonce2_size]
  describe('mining.subscribe', function () {
    it('should return mining.set_difficulty', function (done) {
      nock_bitcoind('getblocktemplate')
      var reqMiningSubscribe = '{"id": 0, "method": "mining.subscribe", "params": ["cgminer/4.7.0"]}'
      nodep2pool.stratum.miningSubscribe(reqMiningSubscribe, function (err, res) {
        if (err) {
          assert.fail('Should have passed')
          done()
        } else {
          assert.equal(3, res.result.version)
          done()
        }
      })
    })
  })

  describe('mining.authorize', function () {
    it('should return true')
  })

  describe('mining.get_transactions', function () {
    it('should return array of transactions')
  })

  describe('mining.submit', function () {
    it('should return true')
  })

  describe('mining.suggest_difficulty', function () {
    it('should return true')
  })

  describe('mining.suggest_target', function () {
    it('should return true')
  })
})

describe('Stratum client', function () {
  describe('can connect', function () {
    it('should return true')
  })

  describe('client.get_version', function () {
    it('should return version string')
  })

  describe('client.reconnect', function () {
    it('should return array of transactions')
  })

  describe('mining.notify', function () {
    it('should return true')
  })
  describe('mining.set_difficulty', function () {
    it('should return true')
  })
  describe('mining.set_extranonce', function () {
    it('should return true')
  })
})

describe('Bitcoin node', function () {
  describe('bitcoind', function () {
    it('getblocktemplate - connect', function (done) {
      nock_bitcoind('getblocktemplate')
      nodep2pool.bitcoind.getBlockTemplate(function (err, res) {
        if (err) {
          assert.fail('Should have passed')
          done()
        } else {
          assert.equal(3, res.result.version)
          done()
        }
      })
    })

    it('getblocktemplate - timeout', function (done) {
      nock_bitcoind('timeout')
      nodep2pool.bitcoind.getBlockTemplate(function (err, res) {
        if (err) {
          assert.equal('Timed out', err)
          done()
        } else {
          assert.fail('Should not have failed')
          done()
        }
      })
    })
  })
})
