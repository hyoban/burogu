import { useMediaQuery } from "@/hooks/useMediaQuery"

export function useSystemDark() {
	return useMediaQuery("(prefers-color-scheme: dark)")
}
