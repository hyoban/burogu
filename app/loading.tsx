// https://beta.nextjs.org/docs/routing/loading-ui
// https://beta.nextjs.org/docs/api-reference/file-conventions/loading

const repeat = 4

export default function Loading() {
	return (
		<ul className="space-y-5">
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<li key={i} className="flex gap-6">
						<time className="font-mono">{"1970-01-01"}</time>
						<p className="underline underline-offset-[6px] decoration-dashed hover:decoration-solid">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</p>
					</li>
				))}
		</ul>
	)
}
