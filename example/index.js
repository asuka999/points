const mdPoint = require('../dist/index')
const path = require('path')
mdPoint({
  main: path.resolve(__dirname, 'index.md'),
})