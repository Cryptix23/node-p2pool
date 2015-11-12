'use strict'

var bitcoind = require('./bitcoind.js')

exports.BITCOIND_RPC_PASS = process.env.TEST_PASS || 'foo'
exports.bitcoind = bitcoind
