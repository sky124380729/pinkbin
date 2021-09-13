const fs = require('fs')
const path = require('path')
const pkgDir = path.join(__dirname, '../packages')
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)
const { pack } = require('./utils')

const pkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).filter((item) => {
	let tmp = path.join(pkgDir, item)
	return !fs.statSync(tmp).isFile()
})

module.exports = {
	generator: {
		description: 'build package',
		prompts: [
			{
				type: 'checkbox',
				name: 'pkgs',
				message: 'Please choose the packages you want to build',
				choices: pkgs
			}
		],
		actions: function () {
			return [{ type: 'build' }]
		}
	},
	setActionType: function (plop) {
		plop.setActionType('build', async function (answers) {
			let { pkgs } = answers
			// 由于其他包可能依赖utils，因此先编译utils
			if (pkgs.includes('utils')) {
				pkgs = ['utils', ...pkgs.filter((v) => v !== 'utils')]
			}
			for (const pkgName of pkgs) {
				const pkgRoot = getPkgRoot(pkgName)
				pack(pkgName, pkgRoot)
			}
		})
	}
}
