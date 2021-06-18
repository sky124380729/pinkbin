export function filterUniqueByKey<T, K extends keyof T>(arr: T[], key: K): T[] {
	const o = Object.create(null)
	return arr.reduce((prev: T[], curr: T) => {
		const value = curr[key]
		if (o[value] === void 0) {
			o[value] = true
			prev.push(curr)
		}
		return prev
	}, [])
}
