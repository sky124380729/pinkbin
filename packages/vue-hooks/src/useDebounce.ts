/**
 * @public
 */
export function useDebounce(fn: (...args: unknown[]) => unknown, wait = 300) {
	let timer: ReturnType<typeof setTimeout>
	return function (this: Window, ...args: unknown[]) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, wait)
	}
}
