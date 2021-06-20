const buildGenerator = require('./scripts/build')
const publishGenerator = require('./scripts/publish')
const fs = require('fs')
const path = require('path')
const execa = require('execa')

module.exports = function (plop) {
	plop.setActionType('build', function (answers) {
		const { pkgs } = answers
		pkgs.forEach(async (pkg) => {
			await execa('rollup', ['-c', '--environment', [`TARGET:${pkg}`].filter(Boolean).join(',')], { stdio: 'inherit' })
		})
	})
	plop.setActionType('publish', function (answers) {
		const { pkgs } = answers
		const getPkgRoot = (pkg) => path.resolve(__dirname, './packages/' + pkg)
		const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
		pkgs.forEach(async (pkgName) => {
			// const dirName = path.join(process.cwd(), `packages/${pkg}`)
			// // await execa('rollup', ['-c', '--environment', [`TARGET:${pkg}`].filter(Boolean).join(',')], { stdio: 'inherit' })
			// console.log(__dirname)
			// await execa('cd', [path.join(__dirname, `packages/${pkg}`)])
			// console.log(__dirname)
			// await execa('yarn', ['publish', '--access', 'public'])
			const pkgRoot = getPkgRoot(pkgName)
			const pkgPath = path.resolve(pkgRoot, 'package.json')
			const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
			if (pkg.private) return
			await run('yarn', ['publish', '--new-version', '1.0.5', '--access', 'public'], {
				cwd: pkgRoot,
				stdio: 'pipe'
			})
		})
	})
	plop.setGenerator('build', buildGenerator)
	plop.setGenerator('publish', publishGenerator)
}
