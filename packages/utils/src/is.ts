/**
 * @public
 */
const toString = Object.prototype.toString

/**
 * @public
 */
function is(val: unknown, type: string): boolean {
	return toString.call(val) === `[object ${type}]`
}

/**
 * @public
 */
export function isString(val: unknown): val is string {
	return is(val, 'String')
}

/**
 * @public
 */
export function isNumber(val: unknown): val is number {
	return is(val, 'Number')
}

/**
 * @public
 */
export function isFunction(val: unknown): val is Function {
	return typeof val === 'function'
}

/**
 * @public
 */
export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object')
}

/**
 * @public
 */
export function isWindow(val: any): val is Window {
	return typeof window !== 'undefined' && is(val, 'Window')
}

/**
 * @public
 */
export function isElement(val: unknown): val is Element {
	return isObject(val) && !!val.tagName
}

/**
 * @public
 */
export function isUrl(path: string): boolean {
	const reg =
		/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
	return reg.test(path)
}
