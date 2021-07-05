// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../node_modules/@types/js-cookie/index.d.ts" />

import Cookie from 'js-cookie'

import { JsonParse, JsonStringify } from '@pinkbin/utils'

/** @public */
export type StorageType = 'localStorage' | 'sessionStorage'

/** @public */
export interface IStorage {
	local: Store
	session: Store
	cookie: Cookies.CookiesStatic
}

/** @public */
export class Store {
	store: Storage
	constructor(key: StorageType) {
		if (key === 'localStorage') {
			this.store = window.localStorage
		} else {
			this.store = window.sessionStorage
		}
	}
	get(key: string) {
		return JsonParse(this.store.getItem(key))
	}
	set(key: string, val: any) {
		this.store.setItem(key, JsonStringify(val))
	}
	has(key: string) {
		return this.store.get(key) !== undefined
	}
	remove(key: string) {
		this.store.removeItem(key)
	}
	clear() {
		this.store.clear()
	}
	forEach(callback: (key: string, val: any) => void) {
		for (const key in this.store) {
			const val = this.store[key]
			callback(key, val)
		}
	}
}

/** @public */
const storage: IStorage = {
	local: new Store('localStorage'),
	session: new Store('sessionStorage'),
	cookie: Cookie
}

export default storage
