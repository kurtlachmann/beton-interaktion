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


export const BetonList: Beton[] = [
	new Beton("C12/15", 12, 2700),
	new Beton("C16/20", 16, 2900),
	new Beton("C20/25", 20, 3000),
	new Beton("C25/30", 25, 3100),
	new Beton("C30/37", 30, 3300),
	new Beton("C35/45", 35, 3400),
	new Beton("C40/50", 40, 3500),
	new Beton("C45/55", 45, 3600),
	new Beton("C50/60", 50, 3700),
]
