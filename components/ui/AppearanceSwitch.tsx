"use client"

import { useDark } from "@/hooks/useDark"

const AppearanceSwitch = () => {
	const [, toggleDark] = useDark()

	return (
		<button onClick={toggleDark} className="flex text-2xl">
			<div className="i-carbon-sun rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
			<div className="i-carbon-moon absolute rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</button>
	)
}

export default AppearanceSwitch
