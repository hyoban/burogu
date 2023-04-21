import CommandMenuInServer from "@/app/components/part/CommandMenuInServer"
import Avatar from "@/app/components/ui/Avatar"

export default function Header({}) {
	return (
		<header className="flex w-full justify-between print:hidden">
			<Avatar className="w-16 h-16" />
			<CommandMenuInServer />
		</header>
	)
}
