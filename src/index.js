'use strict'

var bitcoind = require('node-bitcoin-rpc')

console.log(process.env.TEST_PASS)
exports.BITCOIND_RPC_PASS = process.env.TEST_PASS || 'foo'

exports.getBlockTemplate = function getBlockTemplate (cb) {
  bitcoind.init('localhost', 8332, 'bitcoinrpc', exports.BITCOIND_RPC_PASS)
  var params = {'capabilities': ['coinbasetxn', 'workid', 'coinbase/append']}
  bitcoind.call('getblocktemplate', [params], function cb_gbt (err, res) {
    if (err) {
      cb(err)
    }
    cb(res)
  })
}
