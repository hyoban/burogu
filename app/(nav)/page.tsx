import FadeInAndOut from "@/app/components/FadeInAndOut"
import Resume from "./resume.mdx"

export default function Page() {
	return (
		<article className="my-8 flex w-full flex-col gap-3 prose">
			<FadeInAndOut>
				<Resume />
			</FadeInAndOut>
		</article>
	)
}
