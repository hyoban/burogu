// @/lib/dayjs.ts

import SITE_CONFIG from "@/config/site.config"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

const { timeZone } = SITE_CONFIG

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)
