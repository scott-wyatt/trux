module.exports = {
  packLoad: (payload) => {
    return {
      type: 'PACK_LOAD',
      payload
    }
  },
  packLoadSuccess: (payload) => {
    return {
      type: 'PACK_LOAD_SUCCESS',
      payload
    }
  },
  packLoadFailure: (payload) => {
    return {
      type: 'PACK_LOAD_FAILURE',
      payload
    }
  }
}
