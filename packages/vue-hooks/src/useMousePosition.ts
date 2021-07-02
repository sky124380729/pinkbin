import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import type { ToRefs } from 'vue'

/**
 * @public
 */
export function useMousePosition(): ToRefs {
	const pos = reactive({
		x: 0,
		y: 0
	})
	const updateMouse = (e: MouseEvent) => {
		pos.x = e.pageX
		pos.y = e.pageY
	}
	onMounted(() => {
		document.addEventListener('click', updateMouse)
	})
	onUnmounted(() => {
		document.removeEventListener('click', updateMouse)
	})
	return toRefs(pos)
}
