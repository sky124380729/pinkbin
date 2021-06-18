import type { Ref } from 'vue'
declare interface Fn<T = any, R = T> {
	(...arg: T[]): R
}
export declare function useClickOutside(elementRef: Ref<null | HTMLElement>): Ref<boolean>
export declare function useDebounce(fn: (...args: unknown[]) => unknown, wait?: number): (this: Window, ...args: unknown[]) => void
export declare function useDebouncedRef<T = any>(value: T, delay?: number): import('vue').Ref<T>
export declare function useDOMCreate(nodeId: string): void
export declare function useList(action: Fn, labelKey?: string, valueKey?: string): import('vue').Ref<any[]>
export declare function useExpose<T>(apis: T): void
export declare function useInCacheFn(hook: Fn): void
export declare function useMousePosition(): import('vue').ToRefs<{
	x: number
	y: number
}>
export declare function useWinResize(fn: Fn, timeout?: number): void
