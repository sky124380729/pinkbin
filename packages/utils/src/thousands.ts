import { isString, isNumber } from './is'
export const thousands = (num: any): string => {
	return isString(num) || isNumber(num) ? (+num).toLocaleString() : ''
}
