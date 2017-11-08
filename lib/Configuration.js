const merge = require('lodash.merge')
const path = require('path')
const joi = require('joi')
const schemas = require('./schemas')

const ConfigurationProxyHandler = {
  get (target, key) {
    if (target.has && target.has(key)) {
      const value = target.immutable === true ? Object.freeze(target.get(key)) : target.get(key)
      return new Proxy(value, ConfigurationProxyHandler)
    }
    else {
      return target.immutable === true ? Object.freeze(target[key]) : target[key]
    }
  }
}

module.exports = class Configuration extends Map {
  constructor (configTree = { }, processEnv = { }) {
    const config = Configuration.buildConfig(configTree)
    const configEntries = Object.entries(Configuration.flattenTree(config))
    super(configEntries)

    this.validateConfig(config)

    this.immutable = false
    this.env = processEnv

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.entries = this.entries.bind(this)
    this.has = this.has.bind(this)

    return new Proxy(this, ConfigurationProxyHandler)
  }

  set (key, value) {
    if (this.immutable === true) {
      throw new IllegalAccessError('Cannot set properties directly on config. Use .set(key, value) (immutable)')
    }
    return super.set(key, value)
  }

  /**
    * Merge tree into this configuration. Return overwritten keys
   */
  merge (configTree) {
    const configEntries = Object.entries(Configuration.flattenTree(configTree))
    return configEntries.map(([ key, value ]) => {
      const hasKey = this.has(key)
      this.set(key, value)

      return { hasKey, key }
    })
  }

  /**
   * Prevent changes to the app configuration
   */
  freeze () {
    this.immutable = true
  }

  /**
   * Allow changes to the app configuration
   */
  unfreeze () {
    this.immutable = false
  }

  /**
   * Flattens configuration tree
   */
  static flattenTree (tree = { }) {
    const toReturn = { }

    Object.entries(tree).forEach(([ k, v ]) => {
      if (typeof v === 'object' && v !== null) {
        const flatObject = Configuration.flattenTree(v)
        Object.keys(flatObject).forEach(flatKey => {
          toReturn[`${k}.${flatKey}`] = flatObject[flatKey]
        })
      }
      toReturn[k] = v
    })
    return toReturn
  }

  /**
   * Copy and merge the provided configuration into a new object, decorated with
   * necessary default and environment-specific values.
   */
  static buildConfig (initialConfig = { }, nodeEnv) {
    const root = path.resolve(path.dirname(require.main.filename))
    const temp = path.resolve(root, '.tmp')
    const envConfig = initialConfig.env && initialConfig.env[nodeEnv]

    const configTemplate = {
      main: {
        maxListeners: 128,
        packs: [ ],
        paths: {
          root: root,
          temp: temp,
          sockets: path.resolve(temp, 'sockets'),
          logs: path.resolve(temp, 'log')
        },
        timeouts: {
          start: 10000,
          stop: 10000
        },
        freezeConfig: true,
        createPaths: true
      },
      log: { }
    }

    const mergedConfig = merge(configTemplate, initialConfig, (envConfig || { }))
    mergedConfig.env = nodeEnv

    return mergedConfig
  }

  /**
   * Validate the structure and prerequisites of the configuration object. Throw
   * an Error if invalid; invalid configurations are unrecoverable and require
   * that the programmer fix them.
   */
  validateConfig (config) {
    const result = joi.validate(config, schemas.config)
    if (result.error) {
      throw new ValidationError('Project Configuration Error', result.error.details)
    }
  }
}

