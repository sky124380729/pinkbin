import { onUnmounted } from 'vue'

/**
 * @public
 */
export function useDOMCreate(nodeId: string) {
	const node = document.createElement('div')
	node.id = nodeId
	document.body.appendChild(node)
	onUnmounted(() => {
		document.body.removeChild(node)
	})
}
