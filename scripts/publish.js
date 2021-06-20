const fs = require('fs')
const path = require('path')

const pkgDir = path.join(__dirname, '../packages')

const pkgs = fs.readdirSync(pkgDir, { encoding: 'utf-8' }).filter((item) => {
	let tmp = path.join(pkgDir, item)
	return !fs.statSync(tmp).isFile()
})

module.exports = {
	description: 'publish pkg',
	prompts: [
		{
			type: 'checkbox',
			name: 'pkgs',
			message: 'choose what pkg you want to publish',
			choices: pkgs
		}
	],
	actions: () => {
		return [{ type: 'publish' }]
	}
}
