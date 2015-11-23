'use strict'

function miningSubscribe (reqMiningSubscribe, cb) {
  try {
    reqMiningSubscribe = JSON.parse(reqMiningSubscribe)
    cb(null, 'Not done yet')
  } catch (e) {
    cb(e.message)
  }
}

exports.miningSubscribe = miningSubscribe
