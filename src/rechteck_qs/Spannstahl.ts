import { SelectionOption } from "./Selector"


export class Spannstahl implements SelectionOption {
	label: string
	f_p01k: number     // Charakteristische Streckgrenze bei 0.1% bleibender Dehnung [N/mm^2]
	f_pd: number       // := f_p01k / 1.15
	f_pk: number       // Zugfestigkeit [N/mm^2]

	constructor(label: string, f_p01k: number, f_pk: number) {
		this.label = label;
		this.f_p01k = f_p01k;
		this.f_pd = f_p01k / 1.15;
		this.f_pk = f_pk;
	}

}


export const st1375 = new Spannstahl("St 1375/1570", 1360, 1570);
export const st1470 = new Spannstahl("St 1470/1670", 1420, 1670);
export const st1570 = new Spannstahl("St 1570/1770", 1500, 1770);

export const SpannstahlList: Spannstahl[] = [
	st1375,
	st1470,
	st1570,
]
