import { useEffect, useRef } from "react"

export function useInterval(callback: () => void, delay?: number | null) {
	const savedCallback = useRef<() => void>(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		if (delay !== null) {
			const interval = setInterval(() => savedCallback.current(), delay || 0)
			return () => clearInterval(interval)
		}

		return undefined
	}, [delay])
}
