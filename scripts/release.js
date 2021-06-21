const fs = require('fs')
const path = require('path')
const pkgDir = path.join(__dirname, '../packages')
const execa = require('execa')
const chalk = require('chalk')
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

const pkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).filter((item) => {
	let tmp = path.join(pkgDir, item)
	return !fs.statSync(tmp).isFile()
})

module.exports = {
	generator: {
		description: 'publish pkg',
		prompts: [
			{
				type: 'checkbox',
				name: 'pkgs',
				message: 'choose what pkg you want to publish',
				choices: pkgs
			},
			{
				type: 'input',
				name: 'version',
				message: 'please input version to publish',
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
			const { pkgs, version } = answers
			for await (const pkgName of pkgs) {
				const pkgRoot = getPkgRoot(pkgName)
				const pkgPath = path.resolve(pkgRoot, 'package.json')
				const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
				if (pkg.private) return
				await execa('rollup', ['-c', '--environment', [`TARGET:${pkgName}`].filter(Boolean).join(',')], { stdio: 'inherit' })
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
			}
		})
	}
}
