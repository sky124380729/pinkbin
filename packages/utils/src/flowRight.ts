export function flowRight(...fns: Fn[]) {
	return function (value: any) {
		while (fns.length) {
			const fn = fns.pop()
			value = typeof fn === 'function' ? fn(value) : value
		}
		return value
	}
}
