/* global describe it before */
var assert = require('assert')
var nock = require('nock')

describe('Bitcoin node', function () {
  before(function () {
  })

  describe('client', function (done) {
    it('it should be able to connect', function () {
      nock('http://localhost:8332')
        .filteringRequestBody(function () {
          return '*'
        })
        .post('/', '*')
        .reply(
          200,
          {'result': {'errors': ''}, 'error': null},
          {'connection': 'close', 'content-type': 'application/json'}
        )

      var rpc = require('node-json-rpc')

      // Create a server object with options
      // Create a server object with options
      var options = {
        // int port of rpc server, default 5080 for http or 5433 for https
        port: 8332,
        // string domain name or ip of rpc server, default '127.0.0.1'
        host: 'localhost',
        // string with default path, default '/'
        path: '/',
        // boolean false to turn rpc checks off, default true
        strict: true,
        login: 'bitcoinrpctest',
        hash: 'moo'
      }
      var client = new rpc.Client(options)

      // nock.recorder.rec()
      // nock.disableNetConnect()

      client.call(
        {'jsonrpc': '2.0', 'method': 'getnetworkinfo', 'params': [], 'id': 0},
        function (err, res) {
          // Did it all work ?
          if (err) {
            console.log(err)
            console.log(res)
            assert.equal("{ result: { errors: '' }, error: null }", console.log(err))
          } else {
            assert.equal("{ result: { errors: '' }, error: null }", console.log(res))
            // done()
          }
        }
      )

      // var nockCalls = nock.recorder.play()
      // console.dir(nockCalls)
    })

    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(5))
      assert.equal(-1, [1, 2, 3].indexOf(0))
    })
  })
})
