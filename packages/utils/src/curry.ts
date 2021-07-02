/**
 * @public
 */
export function curry(fn: Fn) {
	return function curried(...args: any[]) {
		if (args.length < fn.length) {
			return function (...innerArgs: any[]) {
				return curried(...args.concat(innerArgs))
			}
		}
		return fn(...args)
	}
}
