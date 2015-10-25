'use strict'

var rpc = require('node-json-rpc')

exports.connect = function (host, port, user, pass, method, param, done_cb) {
  // Create a server object with options
  var client = new rpc.Client({
    host: host,
    port: port,
    path: '/',
    strict: true,
    login: user,
    hash: pass
  })

  client.call(
    {'jsonrpc': '2.0', 'method': method, 'params': [], 'id': 0},
    function (err, res) {
      // Did it all work ?
      if (err) {
        // console.log(err)
        // console.log(res)
        done_cb(err)
      } else {
        done_cb(res)
      }
    }
  )
}
