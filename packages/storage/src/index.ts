/**
 * It's a library for store
 * @remarks
 * we can use localStorage,sessitonStorage or Cookie
 * if we use Cookie,the api is same as js-cookie
 * @packageDocumentation
 */

import storage from './storage'
export type { IStorage, Store, StorageType } from './storage'
export default storage
