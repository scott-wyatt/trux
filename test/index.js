const TruxApp = require('..')

before(() => {
  global.app = new TruxApp(require('./integration/app'))
  return global.app.start()
})

after(() => {
  return global.app.stop()
})
