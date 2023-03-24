import FadeInAndOut from "@/app/components/FadeInAndOut"
import Resume from "./resume.mdx"

export default function Page() {
	return (
		<FadeInAndOut>
			<article className="my-8 flex w-full flex-col gap-3 prose">
				<Resume />
			</article>
		</FadeInAndOut>
	)
}
