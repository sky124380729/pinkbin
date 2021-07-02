const fs = require('fs')
const path = require('path')
const execa = require('execa')
const rimraf = require('rimraf')
const pkgDir = path.join(__dirname, '../packages')
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)

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
			const { pkgs } = answers
			for await (const pkgName of pkgs) {
				const pkgRoot = getPkgRoot(pkgName)
				// rollup打包
				await execa('rollup', ['-c', '--environment', [`TARGET:${pkgName}`].filter(Boolean).join(',')], { stdio: 'inherit' })
				// api-extractor合并类型声明并生成api文档
				await execa('api-extractor', ['run'], { cwd: pkgRoot, stdio: 'inherit' })
				// 删除多余的types文件夹
				rimraf.sync(path.resolve(pkgRoot, './types'))
			}
		})
	}
}
