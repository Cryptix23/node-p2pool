'use strict'

var bitcoind = require('./bitcoind.js')
var stratum = require('./stratum.js')

exports.BITCOIND_RPC_PASS = process.env.TEST_PASS || 'foo'
exports.bitcoind = bitcoind

exports.stratum = stratum
