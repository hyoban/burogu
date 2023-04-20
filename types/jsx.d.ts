namespace JSX {
	type FunctionComponent = (props: any) => Element | null
	type FunctionComponentWithPromiseReturn = (
		props: any
	) => Promise<Element | null>

	export type ElementType =
		| keyof IntrinsicElements
		| FunctionComponent
		| FunctionComponentWithPromiseReturn
}
