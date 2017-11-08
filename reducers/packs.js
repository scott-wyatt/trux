module.exports.packs = (state = {}, action) => {
  switch (action.type) {
    case 'PACK_LOAD':
      return Object.assign({}, state, {
        // env: action.payload
      })
    case 'PACK_LOAD_SUCCESS':
      return Object.assign({}, state, {
        // env: action.payload
      })
    case 'PACK_LOAD_FAILURE':
      return Object.assign({}, state, {
        // env: action.payload
      })
    default:
      return state
  }
}
