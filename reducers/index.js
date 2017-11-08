// import { combineReducers } from 'redux'
const combineReducers = require('redux').combineReducers
// import app from './app'
const trux = require('./trux').trux
const packs = require('./trux').packs

const truxApp = combineReducers({
  trux,
  packs
})

module.exports.trux = truxApp
