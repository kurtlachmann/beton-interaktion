import { BaustahlList } from "./Baustahl";
import { BetonList } from "./Beton";
import { BaustahlConfig, calc, calc2, Einwirkung, Querschnitt, SpannstahlConfig } from "./math";
import { SpannstahlList } from "./Spannstahl";


test.each([
	[-3.5, 0, 3340.296, 1013.949],
	[-3.5, 5, 76.942, 1417.130],
	[-3.5, 10, -552.687, 1260.485],
	[-3.5, 15, -841.976, 1164.408],
	[-3.5, 20, -1008.164, 1102.351],
	[-3.5, 25, -1141.755, 1047.815],

	// [0, 25, -1974.0, 671.0],  // Different results because the Excel sheet diverges from the algorithm. WHY?
	// [24, 25, -2052, 636],
	// [25, 25, -2052, 636],
])('calc(e_c: %i, e_s: %i)', (e_c, e_s, expected_N_Rd, expected_M_Rd) => {
	// ARRANGE
	let beton = BetonList[2];
	let qs: Querschnitt = {
		b: 50,
		h: 100
	}
	let baustahl: BaustahlConfig = {
		material: BaustahlList[0],
		A_s1: 15,
		A_s2: 5,
		d_1: 10,
		d_2: 5,
	}
	let spannstahl: SpannstahlConfig = {
		material: SpannstahlList[0],
		E_p: 195000,
		A_p: 10,
		d_p: 10
	}
	let einwirkung: Einwirkung = {
		N_Ed: 1000,
		M_Ed: 1500
	}

	// ACT
	let { N_Rd, M_Rd } = calc(e_c, e_s, qs, beton, baustahl, spannstahl, einwirkung)

	// ASSERT
	expect(N_Rd).toBeCloseTo(expected_N_Rd);
	expect(M_Rd).toBeCloseTo(expected_M_Rd);
})


test.each([
	// [0, 25, -2052, 636],  // Different results because the Excel sheet diverges from the algorithm. WHY?
	// [-1, 25, -1835, 542],

	[-2, 25, -1368.389, 343.004],
	[-3.5, 25, -447.101, -33.488],
	[-3.5, 10, 913.189, -547.289],
	[-3.5, 2.174, 2660.662, -862.603],
	[-3.5, 0, 4592.434, -550.650],
])('calc2(e_c: %i, e_s: %i)', (e_c, e_s, expected_N_Rd, expected_M_Rd) => {
	// ARRANGE
	let beton = BetonList[2];
	let qs: Querschnitt = {
		b: 50,
		h: 100
	}
	let baustahl: BaustahlConfig = {
		material: BaustahlList[0],
		A_s1: 15,
		A_s2: 5,
		d_1: 10,
		d_2: 5,
	}
	let spannstahl: SpannstahlConfig = {
		material: SpannstahlList[0],
		E_p: 195000,
		A_p: 10,
		d_p: 10
	}
	let einwirkung: Einwirkung = {
		N_Ed: 1000,
		M_Ed: 1500
	}

	// ACT
	let { N_Rd, M_Rd } = calc2(e_c, e_s, qs, beton, baustahl, spannstahl, einwirkung)

	// ASSERT
	expect(N_Rd).toBeCloseTo(expected_N_Rd);
	expect(M_Rd).toBeCloseTo(expected_M_Rd);
})

export {}