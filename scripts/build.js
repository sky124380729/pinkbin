const fs = require('fs')
const path = require('path')
const execa = require('execa')
const pkgDir = path.join(__dirname, '../packages')

const pkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).filter((item) => {
	let tmp = path.join(pkgDir, item)
	return !fs.statSync(tmp).isFile()
})

module.exports = {
	generator: {
		description: 'build pkg',
		prompts: [
			{
				type: 'checkbox',
				name: 'pkgs',
				message: 'choose what pkg you want to build',
				choices: pkgs
			}
		],
		actions: function () {
			return [{ type: 'build' }]
		}
	},
	setActionType: function (plop) {
		plop.setActionType('build', async function (answers) {
			const { pkgs } = answers
			for await (const pkg of pkgs) {
				await execa('rollup', ['-c', '--environment', [`TARGET:${pkg}`].filter(Boolean).join(',')], { stdio: 'inherit' })
			}
		})
	}
}
