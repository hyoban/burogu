import Link from "@/app/components/ui/Link"

export function useMDXComponents(components) {
	return {
		a: ({ children, href }) => <Link href={href}>{children}</Link>,
		...components,
	}
}
