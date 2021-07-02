const path = require('path')
const execa = require('execa')
const rimraf = require('rimraf')

function getPkgRoot(pkgName) {
	return path.resolve(__dirname, '../packages/' + pkgName)
}

async function pack(pkgName) {
	const pkgRoot = getPkgRoot(pkgName)
	// rollup打包
	await execa('rollup', ['-c', '--environment', [`TARGET:${pkgName}`].filter(Boolean).join(',')], { stdio: 'inherit' })
	// api-extractor 检测类型定义，合并类型声明，并生成api文档
	await execa('api-extractor', ['run'], { cwd: pkgRoot, stdio: 'inherit' })
	// 删除多余的types文件夹
	rimraf.sync(path.resolve(pkgRoot, './types'))
}

module.exports = {
	pack,
	getPkgRoot
}
