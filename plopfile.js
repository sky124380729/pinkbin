const { generator: buildGenerator, setActionType: setBuildAction } = require('./scripts/build')
const { generator: releaseGenerator, setActionType: setReleaseAction } = require('./scripts/release')

module.exports = function (plop) {
	setBuildAction(plop)
	setReleaseAction(plop)
	plop.setGenerator('build', buildGenerator)
	plop.setGenerator('release', releaseGenerator)
}
