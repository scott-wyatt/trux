// import { EventEmitter } from 'events'
const EventEmitter = require('events').EventEmitter

// import { createStore } from 'redux'
const createStore = require('redux').createStore
const reducers = require('./reducers')
const actions = require('./actions')
const lib = require('./lib')

// export class TruxApp extends EventEmitter {
module.exports = class TruxApp extends EventEmitter {
  constructor (app) {
    super()

    if (!app) {
      throw new RangeError('No app definition provided to Trux constructor')
    }
    if (!app.pkg) {
      throw new PackageNotDefinedError()
    }
    if (!app.api) {
      throw new ApiNotDefinedError()
    }

    app.api.models || (app.api.models = { })
    app.api.services || (app.api.services = { })
    app.api.resolvers || (app.api.resolvers = { })
    app.api.policies || (app.api.policies = { })
    app.api.controllers || (app.api.controllers = { })

    // Set the process NODE_ENV
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'

    // Make object of process env
    const processEnv = Object.freeze(JSON.parse(JSON.stringify(process.env)))

    Object.defineProperties(this, {
      // env: {
      //   enumerable: false,
      //   value: processEnv
      // },
      store: {
        enumerable: false,
        value: createStore(reducers.trux)
      },
      actions: {
        enumerable: false,
        value: actions
      },
      reducers: {
        enumerable: false,
        value: reducers
      },
      // pkg: {
      //   enumerable: false,
      //   value: app.pkg
      // },
      // versions: {
      //   enumerable: false,
      //   writable: false,
      //   configurable: false,
      //   value: process.versions
      // },
      // config: {
      //   value: new lib.Configuration(app.config, processEnv),
      //   configurable: true,
      //   writable: false
      // },
      // api: {
      //   value: app.api,
      //   writable: true,
      //   configurable: true
      // },
      // _trux: {
      //   enumerable: false,
      //   value: require('./package')
      // },
      // packs: {
      //   value: { }
      // }
    })

    // const config = new lib.Configuration(app.config, processEnv)
    // console.log(config)

    this.store.dispatch(this.actions.trux.setEnv(processEnv))
    this.store.dispatch(this.actions.trux.setPkg(app.pkg))
    this.store.dispatch(this.actions.trux.setVersions(process.versions))
    this.store.dispatch(this.actions.trux.setTrux(require('./package')))
    this.store.dispatch(this.actions.trux.setApi(app.api))
    this.store.dispatch(this.actions.trux.setConfig({}))
    this.store.dispatch(this.actions.trux.setPacks({}))
    // console.log('TRUX API',app.api)

    const unsubscribe = this.store.subscribe(() =>
      console.log('I CHANGED', this.store.getState())
    )
    // // Stop listening to state updates
    // unsubscribe()
  }

  /**
   * Start the App. Load all Trailpacks.
   *
   * @return Promise
   */
  // async
  start () {
    console.log('I STARTED!')
    this.store.dispatch(this.actions.trux.start())
    // await this.after('trux:ready')
    return this
  }

  // async
  stop () {
    console.log('I STOPPED!')
    this.store.dispatch(this.actions.trux.stop())
  }
}
