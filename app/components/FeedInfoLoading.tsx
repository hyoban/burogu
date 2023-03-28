export default function FeedInfoLoading() {
	return (
		<>
			{Array(10)
				.fill(0)
				.map((_, i) => (
					<div className="animate-pulse flex gap-4 items-center my-2" key={i}>
						<div className="rounded-full bg-neutral-200 dark:bg-neutral-700 h-10 w-10"></div>
						<div className="grow h-3 rounded-md bg-neutral-200 dark:bg-neutral-700"></div>
					</div>
				))}
		</>
	)
}
