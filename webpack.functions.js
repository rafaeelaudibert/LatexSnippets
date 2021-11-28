const Dotenv = require( 'dotenv-webpack' )

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
// @see https://www.npmjs.com/package/dotenv-webpack
module.exports = {
  plugins: [ new Dotenv() ],
}
