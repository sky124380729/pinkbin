/**
 * @public
 */
export function debounce(fn: (...args: unknown[]) => unknown, timeout = 300) {
	let timer: ReturnType<typeof setTimeout>
	return function (this: Window, ...args: unknown[]) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, timeout)
	}
}
