import { jsx } from '@emotion/react'
import { Container, Divider, Grid, Input, InputAdornment, styled, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import BetonSelector from './BetonSelector';
import StahlSelector from './StahlSelector';


const Label = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'right',
}));

export default function RechteckQS() {
	return (
		<Container maxWidth="sm">
			<Typography variant="h4" align="center">Rechteck Querschnitt</Typography>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item xs={2}>
					<Label>Beton</Label>
				</Grid>
				<Grid item xs={10}>
					<BetonSelector />
				</Grid>

				<Grid item xs={2}>
					<Label>Stahl</Label>
				</Grid>
				<Grid item xs={10}>
					<StahlSelector />
				</Grid>

				<Grid item xs={4}>
					<Label>A<sub>s1</sub></Label>
				</Grid>
				<Grid item xs={8}>
					<TextField
						defaultValue={"20.0"}
						fullWidth={true}
						InputProps={{
							inputProps: {
								style: {textAlign: "right"}
							},
							endAdornment: <InputAdornment position="end">
								<Typography>
									cm
								</Typography>
								<Typography style={{marginTop: "-0.5rem", fontSize: "0.8rem"}}>
									2
								</Typography>
							</InputAdornment>
						  }}
					/>
				</Grid>

				<Grid item xs={4}>
					<Label>A<sub>s2</sub></Label>
				</Grid>
				<Grid item xs={8}>
					<TextField
						defaultValue={"0.0"}
						fullWidth={true}
						InputProps={{
							inputProps: {
								style: {textAlign: "right"}
							},
							endAdornment: <InputAdornment position="end">
								<Typography>
									cm
								</Typography>
								<Typography style={{marginTop: "-0.5rem", fontSize: "0.8rem"}}>
									2
								</Typography>
							</InputAdornment>
						  }}
					/>
				</Grid>

				<Grid item xs={4}>
					<Label>d<sub>1</sub></Label>
				</Grid>
				<Grid item xs={8}>
					<TextField
						defaultValue={"20.0"}
						fullWidth={true}
						InputProps={{
							inputProps: {
								style: {textAlign: "right"}
							},
							endAdornment: <InputAdornment position="end">
								<Typography>
									cm
								</Typography>
							</InputAdornment>
						  }}
					/>
				</Grid>

				<Grid item xs={4}>
					<Label>d<sub>2</sub></Label>
				</Grid>
				<Grid item xs={8}>
					<TextField
						defaultValue={"5.0"}
						fullWidth={true}
						InputProps={{
							inputProps: {
								inputMode: "numeric",
								pattern: "[0-9]*",
								style: {textAlign: "right"}
							},
							endAdornment: <InputAdornment position="end">
								<Typography>
									cm
								</Typography>
							</InputAdornment>
						  }}
					/>
				</Grid>
			</Grid>
			{/* <Button variant="contained">Hello World</Button>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
		</Container>
	)
}
