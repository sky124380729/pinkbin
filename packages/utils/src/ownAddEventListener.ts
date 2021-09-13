/**
 * @public
 */

export function ownAddEventListener(scope: Window | HTMLElement | Document, type: string, handler: EventListener, capture = false) {
	scope.addEventListener(type, handler, capture)
	return () => {
		scope.removeEventListener(type, handler, capture)
	}
}
