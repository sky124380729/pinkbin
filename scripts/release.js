const fs = require('fs')
const path = require('path')
const pkgDir = path.join(__dirname, '../packages')
const execa = require('execa')
const chalk = require('chalk')
const { pack, getPkgRoot } = require('./utils')
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

const pkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).filter((item) => {
	let tmp = path.join(pkgDir, item)
	return !fs.statSync(tmp).isFile()
})

module.exports = {
	generator: {
		description: 'publish package',
		prompts: [
			{
				type: 'list',
				name: 'pkg',
				message: 'Please select the package you want to publish',
				choices: pkgs
			},
			{
				type: 'input',
				name: 'version',
				message: 'Please enter the version number you want to release',
				validate(version) {
					if (/^\d+(.\d+){0,2}$/.test(version)) {
						return true
					} else {
						return 'please enter the correct version'
					}
				}
			}
		],
		actions: function () {
			return [{ type: 'release' }]
		}
	},
	setActionType: function (plop) {
		plop.setActionType('release', async function (answers) {
			const { pkg: pkgName, version } = answers
			const pkgRoot = getPkgRoot(pkgName)
			const pkgPath = path.resolve(pkgRoot, 'package.json')
			const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
			await pack(pkgName)
			if (pkg.private) return
			try {
				await run('yarn', ['publish', '--new-version', version, '--access', 'public'], {
					cwd: pkgRoot,
					stdio: 'pipe'
				})
				console.log(chalk.bold(chalk.cyanBright(`=============== Successfully published ${pkgName}@${version} =============== `)))
			} catch (e) {
				if (e.stderr.match(/previously published/)) {
					console.log(chalk.red(`Skipping already published: ${pkgName}`))
				} else {
					throw e
				}
			}
		})
	}
}
