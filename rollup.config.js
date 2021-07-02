import { defineConfig } from 'rollup'
import path from 'path'
import rimraf from 'rimraf'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
// import { terser } from 'rollup-plugin-terser'

const pkgName = process.env.TARGET

if (!pkgName) {
	throw new Error('TARGET package must be specified via --environment flag.')
}

const outputDir = 'dist'
const typesDir = 'types'

// pkgs的目录
const packagesDir = path.resolve(__dirname, 'packages')

// 根据target获取的pkg的目录
const packageDir = path.resolve(packagesDir, pkgName)

const resolve = (p) => path.resolve(packageDir, p)

// 删除原来的目录
rimraf.sync(resolve(outputDir))
rimraf.sync(resolve(typesDir))

const pkg = require(resolve(`package.json`))

// 获取package.json中的builOptions作为配置信息
const packageOptions = pkg.buildOptions || {}

const name = packageOptions.filename || path.basename(packageDir)

export default defineConfig({
	input: resolve('src/index.ts'),
	output: {
		file: resolve(`${outputDir}/${name}.js`)
	},
	external: ['vue'],
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript({
			// 使用自己定义的类型文件目录，不设置为true下面的declarationDir不生效
			useTsconfigDeclarationDir: true,
			tsconfig: path.resolve(__dirname, 'tsconfig.json'),
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					declarationDir: resolve('types')
				},
				include: ['packages/global.d.ts', 'packages/${pkgName}/*/src']
			}
		})
		// terser()
	]
})
