import { SelectionOption } from "./InputCard"


export interface Stahl extends SelectionOption {
	label: string
	f_p01k: number
	f_pk: number
}


export const StahlList: Stahl[] = [
	{
		label: "St 1375/1570",
		f_p01k: 1360,
		f_pk: 1570
	},
	{
		label: "St 1470/1670",
		f_p01k: 1420,
		f_pk: 1670
	},
	{
		label: "St 1570/1770",
		f_p01k: 1500,
		f_pk: 1770
	}
]
