const appState = {
  env: null,
  pkg: null,
  config: null,
  versions: null,
  api: null,
  _trux: null,
  packs: null,
  started: false,
  stopped: false
}

module.exports.trux = (state = appState, action) => {
  switch (action.type) {
    case 'SET_ENV':
      return Object.assign({}, state, {
        env: action.payload
      })
    case 'SET_PKG':
      return Object.assign({}, state, {
        pkg: action.payload
      })
    case 'SET_VERSIONS':
      return Object.assign({}, state, {
        versions: action.payload
      })
    case 'SET_CONFIG':
      return Object.assign({}, state, {
        config: action.payload
      })
    case 'SET_API':
      return Object.assign({}, state, {
        api: action.payload
      })
    case 'SET_TRUX':
      return Object.assign({}, state, {
        _trux: action.payload
      })
    case 'SET_PACKS':
      return Object.assign({}, state, {
        packs: action.payload
      })
    case 'START':
      console.log('START',action)
      return Object.assign({}, state, {started: true, stopped: false}, action.payload)
    case 'STOP':
      console.log('STOP', state, action)
      return Object.assign({}, state, {started: false, stopped: true}, action.payload)
    default:
      return state
  }
}
