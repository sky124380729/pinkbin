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
export declare function ft(eltaTime: number, distance: number, duration?: number): number
export declare function JsonParse<T>(val: T): T | never
export declare function JsonStringify<T>(val: T): T | string
export declare function thousands(num: any): string

declare type StorageType = 'localStorage' | 'sessionStorage'
declare class Store {
	store: Storage
	constructor(key: StorageType)
	get(key: string): any
	set(key: string, val: any): void
	has(key: string): boolean
	remove(key: string): void
	clear(): void
	forEach(callback: (key: string, val: any) => void): void
}
declare const storage: {
	local: Store
	session: Store
}
