import "@/lib/dayjs"

import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"

const useNow = () => {
	const [now, setNow] = useState(dayjs().tz())
	const hour = now.hour()
	const minute = now.minute()
	const second = now.second()

	const intervalRef = useRef<number | null>(null)

	useEffect(() => {
		intervalRef.current = window.setInterval(() => {
			setNow(dayjs().tz())
		}, 1000)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [])

	return { now, hour, minute, second }
}

export default useNow
