export const ownAddEventListener = (scope: Window | HTMLElement, type: string, handler: any, capture = false) => {
	scope.addEventListener(type, handler, capture)
	return () => {
		scope.removeEventListener(type, handler, capture)
	}
}
