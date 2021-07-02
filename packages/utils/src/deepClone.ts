/**
 * @public
 */
export function deepClone<T extends { hasOwnProperty: any }>(obj: T): T {
	if (!obj) return obj
	const result = (Array.isArray(obj) ? [] : {}) as any
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				result[key] = deepClone(obj[key]) // 递归复制
			} else {
				result[key] = obj[key]
			}
		}
	}
	return result
}
