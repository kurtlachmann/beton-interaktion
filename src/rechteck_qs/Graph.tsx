import { ApexOptions } from "apexcharts";
import { Suspense, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { propTypes } from "react-bootstrap/esm/Image";


export interface GraphProps {
	data: [number, number][]
	Rd: [number, number]
	Ed: [number, number]
}


type GraphSeries = [
	{
		name: "M-N-Interaktion",
		data: [number, number][]
	}, {
		name: "Ed",
		data: [[number, number]]
	}, {
		name: "Rd",
		data: [[number, number]]
	}
];


function makeSeries(props: GraphProps): GraphSeries {
	return [
		{
			name: "M-N-Interaktion",
			data: props.data
		}, {
			name: "Ed",
			data: [props.Ed]
		}, {
			name: "Rd",
			data: [props.Rd]
		}
	];
}


function getGraphOptions(x_min: number, x_max: number): ApexOptions {
	return {
		chart: {
			id: "mninteraktion",
			type: "line",
			animations: {
				enabled: false,
			},
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false,
			}
		},
		xaxis: {
			type: 'numeric',
			min: x_min,
			max: x_max,
			tickAmount: 14,
			decimalsInFloat: 0,
			title: {
				text: "Biegemoment M-Rd in [kNm]"
			},
		},
		yaxis: {
			tickAmount: 8,
			decimalsInFloat: 0,
			title: {
				text: "Normalkraft N-Rd in [kN]"
			},
		},
		stroke: {
			lineCap: 'round',
		},
		annotations: {
			yaxis: [
				{
					y: 0,
					strokeDashArray: 0,
					borderColor: '#888',
					borderWidth: 1,
					opacity: 1
				}
			],
			xaxis: [
				{
					x: 0,
					strokeDashArray: 0,
					borderColor: '#888',
					borderWidth: 1,
					opacity: 1
				}
			]
		},
		tooltip: {
			intersect: true,
			shared: false,
		},
		legend: {
			position: "bottom",
			height: 40,
			itemMargin: {
				horizontal: 10,
				vertical: 0
			}
		},
		markers: {
			// size: 3,
			// strokeWidth: 0,
			// hover: {
			// 	size: 3,
			// },
			// discrete: [{
			// 	seriesIndex: 1,
			// 	dataPointIndex: 0,
			// 	fillColor: '#00e396',
			// 	strokeColor: '#fff',
			// 	size: 10,
			// 	shape: "circle",
			// }]
		},
		grid: {
			xaxis: {
				lines: {
					show: true,
				}
			},
			yaxis: {
				lines: {
					show: true,
				}
			},
		},
	}
}


function getMinMaxX(series: GraphSeries) {
	let M_min = Infinity;
	let N_min = Infinity;
	let M_max = -Infinity;
	let N_max = -Infinity;
	for (let [M, N] of series[0].data) {
		if (M > M_max) M_max = M;
		if (N > N_max) N_max = N;
		if (M < M_min) M_min = M;
		if (N < N_min) N_min = N;
	}
	let x_min = Math.floor(M_min / 500) * 500 - 500
	let x_max = Math.floor(M_max / 500) * 500 + 500
	return [x_min, x_max]
}


export default function Graph(props: GraphProps) {
	let [component, setComponent] = useState(<div></div>);
	const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

	useEffect(() => {
		// Rendering the graph takes some time. Wait a bit if the input changes again. Once the user
		// has stopped typing we actually start rendering.
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			timeoutRef.current = null;
			const series = makeSeries(props);
			let [x_min, x_max] = getMinMaxX(series);
			const options = getGraphOptions(x_min, x_max);
			setComponent(<Chart options={options} series={series} type="line" />);
		}, 1000);
		return () => {if (timeoutRef.current) clearTimeout(timeoutRef.current)};
	}, [props]);

	return <>{component}</>
}
