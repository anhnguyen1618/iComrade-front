const path = require('path');
module.exports = {
  app: path.resolve(__dirname, '..', 'app'),
  serve: path.join(__dirname, '..', 'build', 'public'),
  build: path.join(__dirname, '..', 'build')
}
