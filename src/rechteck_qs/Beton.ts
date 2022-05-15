import { SelectionOption } from "./InputCard"


export class Beton implements SelectionOption {
	label: string
	f_ck_cyl: number   // Charakteristische Zylinderdruckfestigkeit [kN/cm^2]
	f_cd: number       // := 0.85 * f_ck / 1.5
	E: number  		   // Mittleres Elastizitätsmodul [N/mm^2]
	e_c2: number       // epsilon_c2 [Promille]

	constructor(label: string, f_ck_cyl: number, E: number) {
		this.label = label;
		this.f_ck_cyl = f_ck_cyl;
		this.f_cd = 0.85 * f_ck_cyl / 1.5;
		this.E = E;
		this.e_c2 = -2.0;
	}
}


export const c1215 = new Beton("C12/15", 12, 2700);
export const c1620 = new Beton("C16/20", 16, 2900);
export const c2025 = new Beton("C20/25", 20, 3000);
export const c2530 = new Beton("C25/30", 25, 3100);
export const c3037 = new Beton("C30/37", 30, 3300);
export const c3545 = new Beton("C35/45", 35, 3400);
export const c4050 = new Beton("C40/50", 40, 3500);
export const c4555 = new Beton("C45/55", 45, 3600);
export const c5060 = new Beton("C50/60", 50, 3700);

export const BetonList: Beton[] = [
	c1215,
	c1620,
	c2025,
	c2530,
	c3037,
	c3545,
	c4050,
	c4555,
	c5060,
]
