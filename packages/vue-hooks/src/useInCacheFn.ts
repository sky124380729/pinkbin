import { nextTick, onActivated, onMounted } from 'vue'
export function useInCacheFn(hook: Fn) {
	let mounted: boolean

	onMounted(() => {
		hook()
		nextTick(() => {
			mounted = true
		})
	})

	onActivated(() => {
		if (mounted) {
			hook()
		}
	})
}
