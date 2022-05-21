import { Baustahl } from "./Baustahl";
import { Beton } from "./Beton";
import { Spannstahl } from "./Spannstahl";


export enum RefType {
	H,
	D
}


export interface Querschnitt {
	b: number
	h: number
}

export interface BaustahlConfig {
	material: Baustahl
	A_s1: number
	A_s2: number
	d_1: number
	d_2: number
}

export interface SpannstahlConfig {
	material: Spannstahl
	E_p: number
	A_p: number
	d_p: number
}

export interface Einwirkung {
	N_Ed: number
	M_Ed: number
}


export interface Data {
	interpolated: DataPoint
	MN_data_points: [number, number][]
}


interface DataPoint {
	e_c: number
	e_s1: number
	e_s2: number
	e_p: number
	M_Rd: number
	N_Rd: number
}


export function calcData(qs: Querschnitt, beton: Beton, baustahlConfig: BaustahlConfig, spannstahlConfig: SpannstahlConfig, einwirkung: Einwirkung): Data {
	let data: DataPoint[] = [];
	for (const [e_c, e_s, reftype] of getEpsilonSamplePoints()) {
		data.push(calc(e_c, e_s, reftype, qs, beton, baustahlConfig, spannstahlConfig, einwirkung));
	}
	for (const [e_c, e_s, reftype] of getEpsilonSamplePoints(true)) {
		data.push(calc2(e_c, e_s, reftype, qs, beton, baustahlConfig, spannstahlConfig, einwirkung));
	}

	return {
		interpolated: interpolate_data_points(data, einwirkung.N_Ed),
		MN_data_points: data.map((d) => [d.M_Rd, d.N_Rd])
	};
}


function interpolate_data_points(data_points: DataPoint[], target_N_Ed: number): DataPoint {
	// Find the two data points where N is lower/higher than the target N_Ed (the neighboring values).
	let data_before = data_points[0];
	let data_after = data_points[1];
	for (const data_point of data_points) {
		if (data_point.N_Rd < target_N_Ed) {
			data_before = data_point;
			break;
		}
		data_after = data_point;
	}

	// Interpolate between the two closest data points
	let diff = (data_before.N_Rd - target_N_Ed) / (data_before.N_Rd - data_after.N_Rd);
	const interpolate = (before: number, after: number) => before - diff * (after - before);
	return {
		e_c: interpolate(data_before.e_c, data_after.e_c),
		e_s1: interpolate(data_before.e_s1, data_after.e_s1),
		e_s2: interpolate(data_before.e_s2, data_after.e_s2),
		e_p: interpolate(data_before.e_p, data_after.e_p),
		M_Rd: interpolate(data_before.M_Rd, data_after.M_Rd),
		N_Rd: interpolate(data_before.N_Rd, data_after.N_Rd),
	}
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


function get_p(e_c: number, e_s: number): number {
	let p;
	if (e_c === e_s) {
		if (e_c < 0) {
			p = 1.0;
		} else {
			p = 0.0;
		}
	} else {
		p = e_c / (e_c - e_s);
	}
	return Math.min(Math.max(p, 0.0), 1.0);
}


function get_k(e_c: number, e_s: number, beton: Beton): number {
	let k;
	if (e_c === e_s) {
		if (e_c < 0) {
			k = 1.0;
		} else {
			k = 0.0;
		}
	} else {
		k = (e_c - beton.e_c2) / (e_c - e_s);
	}
	return Math.min(Math.max(k, 0.0), 1.0);
}


function get_beton_F_and_x(e_c: number, e_s: number, ref: number, qs: Querschnitt, beton: Beton): [number, number] {
	let p = get_p(e_c, e_s)
	let k = get_k(e_c, e_s, beton);

	let alpha = -(((e_c - e_s) ** 2) / (3 * (beton.e_c2 ** 2)));
	let beta = (((e_c ** 2) - (e_c * e_s)) / (beton.e_c2 ** 2)) - ((e_c - e_s) / beton.e_c2);
	let gamma = (2 * e_c / beton.e_c2) - ((e_c ** 2) / (beton.e_c2 ** 2))
	const XXX = (alpha * ((p ** 3) - (k ** 3))) + (beta * ((p ** 2) - (k ** 2))) + (gamma * (p - k)) + k;  // TODO what's this variable called?

	let beton_Fc = qs.b * beton.f_cd * 0.1 * ref * XXX
	let beton_x_s = (qs.h / 2.0) - (qs.b * beton.f_cd * 0.1 * ref ** 2 * (0.75 * alpha * (p ** 4 - k ** 4) + (2.0 / 3.0) * beta * (p ** 3 - k ** 3) + 0.5 * gamma * (p ** 2 - k ** 2) + 0.5 * k ** 2) / beton_Fc)
	if (isNaN(beton_x_s)) {
		// Falls alpha/beta/gamma 0 sind tritt hier sonst eine Division 0/0 auf
		beton_x_s = 0.0;
	}

	return [beton_Fc, beton_x_s];
}


export function calc(e_c: number, e_s: number, refType: RefType, qs: Querschnitt, beton: Beton, baustahl: BaustahlConfig, spannstahl: SpannstahlConfig, einwirkung: Einwirkung): DataPoint {
	let ref = refType === RefType.H ? qs.h : qs.h - baustahl.d_1;

	// Beton
	let [beton_Fc, beton_x_s] = get_beton_F_and_x(e_c, e_s, ref, qs, beton);

	// Bewehrung unten
	let bewehrung_unten_e_s1 = e_c - ((e_c - e_s) / ref) * (qs.h - baustahl.d_1)

	let bewehrung_unten_F_s;
	if (bewehrung_unten_e_s1 < -2.174) {
		bewehrung_unten_F_s = baustahl.material.f_yd
	} else if (bewehrung_unten_e_s1 > 2.174) {
		bewehrung_unten_F_s = -baustahl.material.f_yd;
	} else {
		bewehrung_unten_F_s = bewehrung_unten_e_s1 * 0.001 * baustahl.material.E * (-1)
	}
	bewehrung_unten_F_s *= baustahl.A_s1

	let bewehrung_unten_x_s = -(0.5 * qs.h) + baustahl.d_1;

	let bewehrung_unten_dF_c = 0;
	if (bewehrung_unten_e_s1 < 0) {
		if (bewehrung_unten_e_s1 < beton.e_c2) {
			bewehrung_unten_dF_c = beton.f_cd * 0.1;
		} else {
			bewehrung_unten_dF_c = beton.f_cd * 0.1 * (1 - (1 - (bewehrung_unten_e_s1 / beton.e_c2)) ** 2);
		}
	}
	bewehrung_unten_dF_c *= baustahl.A_s1;

	// Bewehrung oben
	let bewehrung_oben_e_s2 = e_c - ((e_c - e_s) / ref) * baustahl.d_2

	let bewehrung_oben_F_s;
	if (bewehrung_oben_e_s2 < -2.174) {
		bewehrung_oben_F_s = baustahl.material.f_yd
	} else if (bewehrung_oben_e_s2 > 2.174) {
		bewehrung_oben_F_s = -baustahl.material.f_yd;
	} else {
		bewehrung_oben_F_s = bewehrung_oben_e_s2 * 0.001 * baustahl.material.E * (-1)
	}
	bewehrung_oben_F_s *= baustahl.A_s2

	let bewehrung_oben_x_s = (0.5 * qs.h) - baustahl.d_2;

	let bewehrung_oben_dF_c = 0;
	if (bewehrung_oben_e_s2 < 0) {
		if (bewehrung_oben_e_s2 < beton.e_c2) {
			bewehrung_oben_dF_c = beton.f_cd * 0.1;
		} else {
			bewehrung_oben_dF_c = beton.f_cd * 0.1 * (1 - (1 - (bewehrung_oben_e_s2 / beton.e_c2)) ** 2);
		}
	}
	bewehrung_oben_dF_c *= baustahl.A_s2;

	// Spannstahl
	let spannstahl_epsilon_p_0;  // vordehnung epsilon_p^(0)
	if (spannstahl.A_p === 0) {
		spannstahl_epsilon_p_0 = 0;
	} else {
		spannstahl_epsilon_p_0 = 1000 * (einwirkung.N_Ed / spannstahl.A_p) / (0.1 * spannstahl.E_p);
	}

	let e_pd = 1000 * spannstahl.material.f_pd / spannstahl.E_p;

	let spannstahl_de_p = e_c - ((e_c - e_s) / ref) * (qs.h - spannstahl.d_p);  // delta epsilon_p
	let spannstahl_e_p = spannstahl_de_p + spannstahl_epsilon_p_0;

	let spannstahl_F_p;
	if (spannstahl_e_p < -e_pd) {
		spannstahl_F_p = spannstahl.material.f_pd * 0.1;
	} else if (spannstahl_e_p > e_pd) {
		spannstahl_F_p = -spannstahl.material.f_pd * 0.1;
	} else {
		spannstahl_F_p = spannstahl_e_p * 0.001 * (spannstahl.E_p * 0.1) * (-1);
	}
	spannstahl_F_p *= spannstahl.A_p;

	let spannstahl_x_sp = -(qs.h / 2.0) + spannstahl.d_p;

	let spannstahl_dF_c = 0;
	if (spannstahl_de_p < 0) {
		if (spannstahl_de_p < beton.e_c2) {
			spannstahl_dF_c = beton.f_cd * 0.1;
		} else {
			spannstahl_dF_c = beton.f_cd * 0.1 * (1 - (1 - (spannstahl_de_p / beton.e_c2)) ** 2);
		}
	}
	spannstahl_dF_c *= spannstahl.A_p;

	let N_Rd = beton_Fc + bewehrung_unten_F_s - bewehrung_unten_dF_c + bewehrung_oben_F_s - bewehrung_oben_dF_c + spannstahl_F_p - spannstahl_dF_c;
	let M_Rd = (beton_Fc * beton_x_s + (bewehrung_unten_F_s - bewehrung_unten_dF_c) * bewehrung_unten_x_s + (bewehrung_oben_F_s - bewehrung_oben_dF_c) * bewehrung_oben_x_s + (spannstahl_F_p - spannstahl_dF_c) * spannstahl_x_sp) / 100

	return {
		e_c: e_c,
		e_s1: bewehrung_unten_e_s1,
		e_s2: bewehrung_oben_e_s2,
		e_p: spannstahl_e_p,
		M_Rd: M_Rd,
		N_Rd: N_Rd,
	}
}


export function calc2(e_c: number, e_s: number, refType: RefType, qs: Querschnitt, beton: Beton, baustahl: BaustahlConfig, spannstahl: SpannstahlConfig, einwirkung: Einwirkung): DataPoint {
	let ref = refType === RefType.H ? qs.h : qs.h - baustahl.d_2;

	// Beton
	let [beton_Fc, beton_x_s] = get_beton_F_and_x(e_c, e_s, ref, qs, beton);

	// Bewehrung unten
	let bewehrung_unten_e_s1 = e_c - ((e_c - e_s) / ref) * (qs.h - baustahl.d_2)

	let bewehrung_unten_F_s;
	if (bewehrung_unten_e_s1 < -2.174) {
		bewehrung_unten_F_s = baustahl.material.f_yd;  // TODO missing * 0.1???
	} else if (bewehrung_unten_e_s1 > 2.174) {
		bewehrung_unten_F_s = -baustahl.material.f_yd;  // TODO missing * 0.1???
	} else {
		bewehrung_unten_F_s = bewehrung_unten_e_s1 * 0.001 * baustahl.material.E * (-1)
	}
	bewehrung_unten_F_s *= baustahl.A_s2

	let bewehrung_unten_x_s = -(0.5 * qs.h) + baustahl.d_2;

	let bewehrung_unten_dF_c = 0;
	if (bewehrung_unten_e_s1 < 0) {
		if (bewehrung_unten_e_s1 < beton.e_c2) {
			bewehrung_unten_dF_c = beton.f_cd * 0.1;
		} else {
			bewehrung_unten_dF_c = beton.f_cd * 0.1 * (1 - (1 - (bewehrung_unten_e_s1 / beton.e_c2)) ** 2);
		}
	}
	bewehrung_unten_dF_c *= baustahl.A_s2;

	// Bewehrung oben
	let bewehrung_oben_e_s2 = e_c - ((e_c - e_s) / ref) * baustahl.d_1

	let bewehrung_oben_F_s;
	if (bewehrung_oben_e_s2 < -2.174) {
		bewehrung_oben_F_s = baustahl.material.f_yd
	} else if (bewehrung_oben_e_s2 > 2.174) {
		bewehrung_oben_F_s = -baustahl.material.f_yd;
	} else {
		bewehrung_oben_F_s = bewehrung_oben_e_s2 * 0.001 * baustahl.material.E * (-1)
	}
	bewehrung_oben_F_s *= baustahl.A_s1;

	let bewehrung_oben_x_s = (0.5 * qs.h) - baustahl.d_1;

	let bewehrung_oben_dF_c = 0;
	if (bewehrung_oben_e_s2 < 0) {
		if (bewehrung_oben_e_s2 < beton.e_c2) {
			bewehrung_oben_dF_c = beton.f_cd * 0.1;
		} else {
			bewehrung_oben_dF_c = beton.f_cd * 0.1 * (1 - (1 - (bewehrung_oben_e_s2 / beton.e_c2)) ** 2);
		}
	}
	bewehrung_oben_dF_c *= baustahl.A_s1;

	// Spannstahl
	let spannstahl_epsilon_p_0;  // vordehnung epsilon_p^(0)
	if (spannstahl.A_p === 0) {
		spannstahl_epsilon_p_0 = 0;
	} else {
		spannstahl_epsilon_p_0 = 1000 * (einwirkung.N_Ed / spannstahl.A_p) / (0.1 * spannstahl.E_p);
	}

	let e_pd = 1000 * spannstahl.material.f_pd / spannstahl.E_p;

	let spannstahl_de_p = e_c - ((e_c - e_s) / ref) * spannstahl.d_p;  // delta epsilon_p
	let spannstahl_e_p = spannstahl_de_p + spannstahl_epsilon_p_0;

	let spannstahl_F_p;
	if (spannstahl_e_p < -e_pd) {
		spannstahl_F_p = spannstahl.material.f_pd * 0.1;
	} else if (spannstahl_e_p > e_pd) {
		spannstahl_F_p = -spannstahl.material.f_pd * 0.1;
	} else {
		spannstahl_F_p = spannstahl_e_p * 0.001 * (spannstahl.E_p * 0.1) * (-1);
	}
	spannstahl_F_p *= spannstahl.A_p;

	let spannstahl_x_sp = (qs.h / 2.0) - spannstahl.d_p;

	let spannstahl_dF_c = 0;
	if (spannstahl_de_p < 0) {
		if (spannstahl_de_p < beton.e_c2) {
			spannstahl_dF_c = beton.f_cd * 0.1;
		} else {
			spannstahl_dF_c = beton.f_cd * 0.1 * (1 - (1 - (spannstahl_de_p / beton.e_c2)) ** 2);
		}
	}
	spannstahl_dF_c *= spannstahl.A_p;

	let N_Rd = beton_Fc + bewehrung_unten_F_s - bewehrung_unten_dF_c + bewehrung_oben_F_s - bewehrung_oben_dF_c + spannstahl_F_p - spannstahl_dF_c;
	let M_Rd = -(beton_Fc * beton_x_s + (bewehrung_unten_F_s - bewehrung_unten_dF_c) * bewehrung_unten_x_s + (bewehrung_oben_F_s - bewehrung_oben_dF_c) * bewehrung_oben_x_s + (spannstahl_F_p - spannstahl_dF_c) * spannstahl_x_sp) / 100

	return {
		e_c: e_c,
		e_s1: bewehrung_unten_e_s1,
		e_s2: bewehrung_oben_e_s2,
		e_p: spannstahl_e_p,
		M_Rd: M_Rd,
		N_Rd: N_Rd,
	}
}