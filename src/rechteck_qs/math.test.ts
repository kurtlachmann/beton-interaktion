import { b500 } from "./Baustahl";
import { c2025 } from "./Beton";
import { BaustahlConfig, calc, calc2, Einwirkung, Querschnitt, RefType, SpannstahlConfig } from "./math";
import { st1375 } from "./Spannstahl";


test.each([
	[-2, -2, RefType.H, 5822.666, 102.783],
	[-2.5, -1.33, RefType.H, 5447.098, 262.553],
	[-3.0, -0.67, RefType.H, 4828.757, 494.768],
	[-3.5, 0, RefType.H, 3963.227, 815.083],

	[-3.5, 0, RefType.D, 3340.296, 1013.949],
	[-3.5, 5, RefType.D, 76.942, 1417.130],
	[-3.5, 10, RefType.D, -552.687, 1260.485],
	[-3.5, 15, RefType.D, -841.976, 1164.408],
	[-3.5, 20, RefType.D, -1008.164, 1102.351],
	[-3.5, 25, RefType.D, -1141.755, 1047.815],
	[0, 25, RefType.D, -1973.671, 671.413],
	[25, 25, RefType.D, -2052.173, 636.086],
])('calc(e_c: %d, e_s: %d)', (e_c, e_s, refType, expected_N_Rd, expected_M_Rd) => {
	// ARRANGE
	let beton = c2025;
	let qs: Querschnitt = {
		b: 50,
		h: 100
	}
	let baustahl: BaustahlConfig = {
		material: b500,
		A_s1: 15,
		A_s2: 5,
		d_1: 10,
		d_2: 5,
	}
	let spannstahl: SpannstahlConfig = {
		material: st1375,
		E_p: 195000,
		A_p: 10,
		d_p: 10
	}
	let einwirkung: Einwirkung = {
		N_Ed: 1000,
		M_Ed: 1500
	}

	// ACT
	let { N_Rd, M_Rd } = calc(e_c, e_s, refType, qs, beton, baustahl, spannstahl, einwirkung)

	// ASSERT
	expect(N_Rd).toBeCloseTo(expected_N_Rd);
	expect(M_Rd).toBeCloseTo(expected_M_Rd);
})


test.each([
	[25, 25, RefType.D, -2052.173, 636.086],
	[0, 25, RefType.D, -2052.173, 636.086],
	[-1, 25, RefType.D, -1834.781, 541.606],
	[-2, 25, RefType.D, -1368.389, 343.004],
	[-3.5, 25, RefType.D, -447.101, -33.488],
	[-3.5, 10, RefType.D, 913.189, -547.289],
	[-3.5, 2.174, RefType.D, 2660.662, -862.603],
	[-3.5, 0, RefType.D, 4592.434, -550.650],

	[-3.5, 0, RefType.H, 4841.943, -473.275],
	[-3.0, -0.67, RefType.H, 5428.331, -201.943],
	[-2.5, -1.33, RefType.H, 5767.514, -18.556],
	[-2, -2, RefType.H, 5822.666, 102.783],
])('calc2(e_c: %i, e_s: %i)', (e_c, e_s, refType, expected_N_Rd, expected_M_Rd) => {
	// ARRANGE
	let beton = c2025;
	let qs: Querschnitt = {
		b: 50,
		h: 100
	}
	let baustahl: BaustahlConfig = {
		material: b500,
		A_s1: 15,
		A_s2: 5,
		d_1: 10,
		d_2: 5,
	}
	let spannstahl: SpannstahlConfig = {
		material: st1375,
		E_p: 195000,
		A_p: 10,
		d_p: 10
	}
	let einwirkung: Einwirkung = {
		N_Ed: 1000,
		M_Ed: 1500
	}

	// ACT
	let { N_Rd, M_Rd } = calc2(e_c, e_s, refType, qs, beton, baustahl, spannstahl, einwirkung)

	// ASSERT
	expect(N_Rd).toBeCloseTo(expected_N_Rd);
	expect(M_Rd).toBeCloseTo(expected_M_Rd);
})

export { };
