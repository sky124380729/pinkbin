// try to convert string to json
export const JsonParse = (val: any) => {
	try {
		val = JSON.parse(val)
	} catch (error) {
		// do nothing
	}
	return val
}

// convert object to string
export const JsonStringify = (val: any) => {
	return typeof val === 'object' ? JSON.stringify(val) : val
}
