const path = require('path')

module.exports = {
  pkg: {
    name: 'core-trux-test'
  },
  api: {
    customkey: {}
  },
  config: {
    main: {
      packs: [
        // Testpack
      ],
      paths: {
        testdir: path.resolve(__dirname, 'testdir')
      }
    }
  }
}

