export function flowRight(...fns: Fn[]) {
	return function (value: any) {
		while (fns.length) {
			const fn = fns.pop()
			value = fn(value)
		}
		return value
	}
}
