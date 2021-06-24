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
export = storage
