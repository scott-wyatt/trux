module.exports = {
  setEnv: (payload) => {
    return {
      type: 'SET_ENV',
      payload
    }
  },
  setPkg: (payload) => {
    return {
      type: 'SET_PKG',
      payload
    }
  },
  setVersions: (payload) => {
    return {
      type: 'SET_VERSIONS',
      payload
    }
  },
  setConfig: (payload) => {
    return {
      type: 'SET_CONFIG',
      payload
    }
  },
  setTrux: (payload) => {
    return {
      type: 'SET_TRUX',
      payload
    }
  },
  setApi: (payload) => {
    return {
      type: 'SET_API',
      payload
    }
  },
  setPacks: (payload) => {
    return {
      type: 'SET_PACKS',
      payload
    }
  },
  start: (payload) => {
    return {
      type: 'START',
      payload
    }
  },
  stop: (payload) => {
    return {
      type: 'STOP',
      payload
    }
  }
}
