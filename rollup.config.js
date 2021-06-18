import { defineConfig } from 'rollup'
import path from 'path'
import rimraf from 'rimraf'
import typescript from 'rollup-plugin-typescript2'
// import { terser } from 'rollup-plugin-terser'

if (!process.env.TARGET) {
	throw new Error('TARGET package must be specified via --environment flag.')
}

const outputDir = 'dist'

// pkgs的目录
const packagesDir = path.resolve(__dirname, 'packages')

// 根据target获取的pkg的目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)

const resolve = (p) => path.resolve(packageDir, p)

// 删除原来的目录
rimraf.sync(resolve(outputDir))

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
		typescript({
			tsconfig: path.resolve(__dirname, 'tsconfig.json'),
			tsconfigOverride: {
				compilerOptions: {
					declaration: true
					// declarationDir: 'dist/types' //now it not work,why
				}
			}
		})
		// terser()
	]
})
