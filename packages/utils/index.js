'use strict'
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/utils')
} else {
	module.exports = require('./src/index')
}
