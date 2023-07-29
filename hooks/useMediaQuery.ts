import { useCallback, useSyncExternalStore } from "react"

export function useMediaQuery(query: string) {
	function getSnapshot() {
		return window.matchMedia(query).matches
	}

	function getServerSnapshot() {
		return undefined
	}

	const subscribe = useCallback(
		(callback: () => void) => {
			const matchMedia = window.matchMedia(query)
			matchMedia.addEventListener("change", callback)
			return () => {
				matchMedia.removeEventListener("change", callback)
			}
		},
		[query],
	)

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
