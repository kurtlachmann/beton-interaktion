import { MenuItem, TextField } from '@mui/material';
import React from 'react';


type Stahl = {
	label: string
	f_p01k: number
	f_pk: number
}

const StahlList: Array<Stahl> = [
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


export default function BetonSelector() {
	const [beton, setBeton] = React.useState(StahlList[0].label);
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
		{StahlList.map((option: Stahl) => (
			<MenuItem key={option.label} value={option.label}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
}
