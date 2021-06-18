export function ft(deltaTime: number, distance: number, duration = 300) {
	return deltaTime * (distance / duration)
}
