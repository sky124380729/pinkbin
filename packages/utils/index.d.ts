export declare function isString(val: unknown): val is string
export declare function isNumber(val: unknown): val is number
export declare function isFunction(val: unknown): val is Function
export declare function isObject(val: any): val is Record<any, any>
export declare function isWindow(val: any): val is Window
export declare function isElement(val: unknown): val is Element
export declare function isUrl(path: string): boolean
export declare function curry(fn: Fn): (...args: any[]) => any
export declare function debounce(fn: (...args: unknown[]) => unknown, timeout?: number): (this: Window, ...args: unknown[]) => void
export declare function deepClone<
	T extends {
		hasOwnProperty: any
	}
>(obj: T): T
export declare function deepMerge<T = any>(src: any, target: any): T
export declare function filterUniqueByKey<T, K extends keyof T>(arr: T[], key: K): T[]
export declare function flowRight(...fns: Fn[]): (value: any) => any
export declare function ownAddEventListener(scope: Window | HTMLElement, type: string, handler: any, capture?: boolean): () => void
