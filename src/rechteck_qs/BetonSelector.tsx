import { SelectionOption } from "./InputCard"


export interface Beton extends SelectionOption {
	label: string,
	f_ck_cyl: number   // Charakteristische Zylinderdruckfestigkeit [N/mm^2]
	E: number  		   // Mittleres Elastizitätsmodul [kN/cm^2]
}


export const BetonList: Beton[] = [
	{
		label: "C12/15",
		f_ck_cyl: 12,
		E: 2700,
	},
	{
		label: "C16/20",
		f_ck_cyl: 16,
		E: 2900,
	},
	{
		label: "C20/25",
		f_ck_cyl: 20,
		E: 3100,
	}
]
