import { SelectionOption } from "./InputCard"


export class Baustahl implements SelectionOption {
	label: string
	f_yk: number       // Streckgrenze [N/mm^2]
	f_yd: number       // := f_yk / 1.15
	E: number  		   // Elastizitätsmodul [kN/cm^2]

	constructor(label: string, f_yk: number, E: number) {
		this.label = label;
		this.f_yk = f_yk;
		this.f_yd = f_yk / 1.15;
		this.E = E;
	}
}


export const BaustahlList: Baustahl[] = [
	new Baustahl("B500", 50.0, 20000),
]
