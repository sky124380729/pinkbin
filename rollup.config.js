import { defineConfig } from 'rollup'
import { resolve } from 'path'
import typescript from 'rollup-plugin-typescript2'

export default defineConfig({
	input: {
		utils: './packages/utils/main.ts',
		vuehooks: './packages/vuehooks/main.ts'
	},
	output: [
		{
			format: 'es',
			dir: 'dist'
		}
	],
	external: ['vue'],
	plugins: [
		typescript({
			tsconfig: resolve(__dirname, 'tsconfig.json'),
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					declarationDir: 'dist/types'
				}
			}
		})
	]
})
