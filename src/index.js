'use strict'

exports.connect = function (host, port, user, pass, method, param, done_cb) {
  var rpc = require('node-json-rpc')

  // Create a server object with options
  // Create a server object with options
  var options = {
    // int port of rpc server, default 5080 for http or 5433 for https
    port: port,
    // string domain name or ip of rpc server, default '127.0.0.1'
    host: host,
    // string with default path, default '/'
    path: '/',
    // boolean false to turn rpc checks off, default true
    strict: true,
    login: user,
    hash: pass
  }
  var client = new rpc.Client(options)

  var jsoncall = '{\'jsonrpc\': \'2.0\', \'method\': \'' + method + '\', \'params\': [], \'id\': 0}'

  client.call(
    jsoncall,
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
