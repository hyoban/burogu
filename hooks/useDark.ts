import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useEffect } from "react"
import { useMedia } from "react-use"

const appearanceAtom = atomWithStorage<"auto" | "dark" | "light">(
	"use-dark",
	"auto"
)

export function useDark() {
	const [setting, setSetting] = useAtom(appearanceAtom)
	const isDark = useMedia("(prefers-color-scheme: dark)")

	useEffect(() => {
		const isDarkMode = setting === "dark" || (isDark && setting !== "light")
		if (isDarkMode) {
			document.documentElement.classList.toggle("dark", true)
			document.documentElement.classList.toggle("light", false)
		} else {
			document.documentElement.classList.toggle("dark", false)
			document.documentElement.classList.toggle("light", true)
		}
		if ((setting === "dark" && isDark) || (setting === "light" && !isDark)) {
			setSetting("auto")
		}
	}, [setting, isDark, setSetting])

	const toggleDark = () => {
		if (setting === "auto") {
			setSetting(isDark ? "light" : "dark")
		} else {
			setSetting("auto")
		}
	}

	return [
		setting === "dark" || (isDark && setting !== "light"),
		toggleDark,
	] as const
}
