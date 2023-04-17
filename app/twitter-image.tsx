import config from "@/site.config.cjs"
import { ImageResponse } from "next/server"

export const alt = config.siteName
export const size = {
	width: 1024,
	height: 512,
}
export const contentType = "image/png"

export default function og() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: "64",
					color: "white",
					background: "linear-gradient(90deg, #4870A9 0%, #DEEDF2 100%)",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "16px",
				}}
			>
				<svg
					width="100"
					height="100"
					viewBox="0 0 3000 3000"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="1500"
						cy="1500"
						r="1500"
						fill="url(#paint0_linear_3_15)"
					/>
					<path
						d="M1095 730.564C971.534 922.692 960.027 1044.37 1010.5 1278.56L1028 1677.56C991.229 1678.9 970.965 1680.75 941.5 1705.06L877 1762.06L763 1985.06L849.5 2468.56H2237.5L2175.5 2210.56C2131.19 2060.37 2105.73 1970.67 2074 1933.06C2048.68 1908.18 2030.22 1894.92 1967.5 1876.06L1945 1705.06L2027 1474.56C2030.94 1533.53 2029.86 1566.59 2027 1625.56L2091.5 1365.56C2124.74 1321.81 2138.13 1290.09 2146 1211.56C2176.2 1039.82 2174.78 941.538 2074 755.564C1946.91 591.839 1837.39 546.095 1585.5 532.564C1373.98 521.63 1266.79 565.98 1095 730.564Z"
						fill="white"
						stroke="black"
					/>
					<path
						d="M1439 1820.06C1429.91 1756.1 1426.49 1722.53 1439 1688.06L1492 1667.06H1555C1558.47 1707.28 1558.59 1729.84 1555 1770.06L1439 1820.06Z"
						fill="#89A7C5"
						stroke="black"
					/>
					<path
						d="M1710.5 1756.56C1698.67 1710.29 1698.49 1686.58 1710.5 1648.56L1773.5 1625.06C1796.51 1629.53 1803.46 1636.34 1821 1651.06C1830.05 1667.41 1832.01 1677.12 1826 1696.06L1802.5 1796.06L1710.5 1756.56Z"
						fill="#90A5C7"
						stroke="black"
					/>
					<path
						d="M1226 1925.06L986.5 2254.06L905 2051.56L1005 1925.06H1044.5L1081 1954.06L1094.5 1925.06L1081 1838.56L1044.5 1788.56L1063 1730.56L1120.5 1838.56C1092.91 1702.96 1092.45 1626.7 1120.5 1491.06C1197.09 1584.86 1246.05 1620.2 1339 1667.06V1714.56L1297 1888.56L1226 1925.06Z"
						fill="#98BAD2"
						stroke="black"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_3_15"
							x1="1500"
							y1="0"
							x2="1500"
							y2="3000"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#4870A9" />
							<stop offset="1" stop-color="#DEEDF2" />
						</linearGradient>
					</defs>
				</svg>
				<h1>{config.siteName}</h1>
			</div>
		),
		size
	)
}