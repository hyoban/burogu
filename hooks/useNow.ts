import "@/lib/dayjs"

import dayjs from "dayjs"
import { useState } from "react"
import { useInterval } from "react-use"

const useNow = () => {
	const [now, setNow] = useState(dayjs().tz())
	const hour = now.hour()
	const minute = now.minute()
	const second = now.second()

	useInterval(() => {
		setNow(dayjs().tz())
	}, 1000)

	return { now, hour, minute, second }
}

export default useNow
