import { MenuItem, TextField } from '@mui/material';
import React from 'react';


type Beton = {
	label: string,
	f_ck_cyl: number   // Charakteristische Zylinderdruckfestigkeit [N/mm^2]
	E: number  		   // Mittleres Elastizitätsmodul [kN/cm^2]
	epsilon_c2: number
}

const BetonList: Array<Beton> = [
	{
		label: "C12/15",
		f_ck_cyl: 12,
		E: 2700,
		epsilon_c2: -2.0
	},
	{
		label: "C16/20",
		f_ck_cyl: 16,
		E: 2900,
		epsilon_c2: -2.0
	},
	{
		label: "C20/25",
		f_ck_cyl: 25,
		E: 3100,
		epsilon_c2: -2.0
	}
]


export default function BetonSelector() {
	const [beton, setBeton] = React.useState(BetonList[0].label);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBeton(event.target.value);
	};
	return <TextField
		id="outlined-select-beton"
		select
		value={beton}
		fullWidth={true}
		onChange={handleChange}
		size="small"
		// variant="standard"
	>
		{BetonList.map((option: Beton) => (
			<MenuItem key={option.label} value={option.label}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
}
