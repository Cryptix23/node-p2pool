/* global describe it before */
var assert = require('assert')
var nock = require('nock')

describe('Bitcoin node', function () {
  before(function () {
    nock('http://127.0.0.1:8332')
      .post('/', '*')
      .reply(200, {
        _id: '123ABC',
        _rev: '946B7D1C',
        username: 'pgte',
        email: 'pedro.teixeira@gmail.com'
      })
      .log(console.log)
  })

  describe('client', function (done) {
    var rpc = require('node-json-rpc')

    // Create a server object with options
    // Create a server object with options
    var options = {
      // int port of rpc server, default 5080 for http or 5433 for https
      port: 8332,
      // string domain name or ip of rpc server, default '127.0.0.1'
      host: '127.0.0.1',
      // string with default path, default '/'
      path: '/',
      // boolean false to turn rpc checks off, default true
      strict: true,
      login: 'bitcoinrpctest',
      hash: 'moo'
    }
    var client = new rpc.Client(options)

    nock.recorder.rec()
    nock.disableNetConnect()

    client.call(
      {'jsonrpc': '2.0', 'method': 'getnetworkinfo', 'params': [], 'id': 0},
      function (err, res) {
        // Did it all work ?
        if (err) {
          console.log(err)
          console.log(res)
        } else {
          console.log(res)
          done()
        }
      }
    )

    var nockCalls = nock.recorder.play()
    console.dir(nockCalls)

    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(5))
      assert.equal(-1, [1, 2, 3].indexOf(0))
    })
  })
})
