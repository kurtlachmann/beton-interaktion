import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Beton } from "./Beton";
import { Spannstahl } from "./Spannstahl";
import { BaustahlConfig, calc, calc2, Einwirkung, Querschnitt, RefType, SpannstahlConfig } from "./math";
import { BaustahlList } from "./Baustahl";
import { SetStateAction } from "react";


export interface GraphProps {
	beton: Beton,
	spannstahl: Spannstahl,
	A_s1: number,
	A_s2: number,
	d_1: number,
	d_2: number,
	E_p: number,
	A_p: number,
	d_p: number,
	b: number,
	h: number,
	N_Ed: number,
	M_Ed: number,
	set_M_Rd: React.Dispatch<SetStateAction<number>>
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
	let data_points = calcData(props);

	// Interpolation
	let [M_bigger, N_smaller] = data_points[0];
	let [M_smaller, N_bigger] = data_points[1];
	for (let [M, N] of data_points) {
		if (N < props.N_Ed) {
			N_smaller = N;
			M_bigger = M;
			break;
		}
		N_bigger = N;
		M_smaller = M;
	}
	let diff = (N_smaller - props.N_Ed) / (N_smaller - N_bigger);
	let M_interpolated = M_bigger - diff * (M_bigger - M_smaller);

	// TODO This is bad. This tries to refresh the RechteckQS component while Graph is being
	// rendered which is rendered as part of RechteckQS. React says: "Cannot update a component
	// (RechteckQS) while rendering a different component (Graph)"
	props.set_M_Rd(M_interpolated);

	return [
		{
			name: "M-N-Interaktion",
			data: data_points
		}, {
			name: "Ed",
			data: [[props.M_Ed, props.N_Ed]]
		}, {
			name: "Rd",
			data: [[M_interpolated, props.N_Ed]]
		}
	];
}


function* getEpsilonSamplePoints(reverse: boolean = false): Generator<[number, number, RefType]> {
	const stepSize = 0.1;
	if (!reverse) {
		yield [-2, -2, RefType.H];
		yield [-2.5, -1.33, RefType.H];
		yield [-3.0, -0.67, RefType.H];
		yield [-3.5, 0, RefType.H];
		for (let e_s = 0; e_s < 25; e_s += stepSize) {
			yield [-3.5, e_s, RefType.D];
		}
		for (let e_c = -3.5; e_c < 25; e_c += stepSize) {
			yield [e_c, 25, RefType.D];
		}
	} else {
		for (let e_c = 25; e_c > -3.5; e_c -= stepSize) {
			yield [e_c, 25, RefType.D];
		}
		for (let e_s = 25; e_s > 0; e_s -= stepSize) {
			yield [-3.5, e_s, RefType.D];
		}
		yield [-3.5, 0, RefType.H];
		yield [-3.0, -0.67, RefType.H];
		yield [-2.5, -1.33, RefType.H];
		yield [-2, -2, RefType.H];
	}
}


function calcData(props: GraphProps): [number, number][] {
	let qs: Querschnitt = {
		b: props.b,
		h: props.h
	};
	let baustahlConfig: BaustahlConfig = {
		material: BaustahlList[0],
		A_s1: props.A_s1,
		A_s2: props.A_s2,
		d_1: props.d_1,
		d_2: props.d_2
	};
	let spannstahlConfig: SpannstahlConfig = {
		material: props.spannstahl,
		E_p: props.E_p,
		A_p: props.A_p,
		d_p: props.d_p,
	};
	let einwirkung: Einwirkung = {
		N_Ed: props.N_Ed,
		M_Ed: props.M_Ed
	}

	let data_points: [number, number][] = [];
	for (const [e_c, e_s, reftype] of getEpsilonSamplePoints()) {
		let { N_Rd, M_Rd } = calc(e_c, e_s, reftype, qs, props.beton, baustahlConfig, spannstahlConfig, einwirkung)
		data_points.push([M_Rd, N_Rd])
	}
	for (const [e_c, e_s, reftype] of getEpsilonSamplePoints(true)) {
		let { N_Rd, M_Rd } = calc2(e_c, e_s, reftype, qs, props.beton, baustahlConfig, spannstahlConfig, einwirkung)
		data_points.push([M_Rd, N_Rd])
	}

	return data_points;
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
			position: "top",
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
	const series = makeSeries(props);
	let [x_min, x_max] = getMinMaxX(series);
	return <Chart options={getGraphOptions(x_min, x_max)} series={series as any} type="line" />
}
