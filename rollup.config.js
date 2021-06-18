import { defineConfig } from 'rollup'
// import { resolve } from 'path'
import typescript from 'rollup-plugin-typescript2'

export default defineConfig({
	input: ['./packages/utils/main.ts'],
	output: [
		{
			format: 'es',
			file: 'dist/utils.js'
		}
	],
	plugins: [
		typescript({
			// tsconfig: resolve(__dirname, 'tsconfig.json'),
			// tsconfigOverride: {
			// 	compilerOptions: {
			// 		declaration: true
			// 	}
			// }
		})
	]
})
