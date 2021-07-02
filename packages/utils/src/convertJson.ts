/**
 * try to convert string to json
 * @public
 */
export const JsonParse = (val: any) => {
	try {
		val = JSON.parse(val)
	} catch (error) {
		// do nothing
	}
	return val
}
/**
 * convert object to string
 * @public
 */
export const JsonStringify = (val: any) => {
	return typeof val === 'object' ? JSON.stringify(val) : val
}
