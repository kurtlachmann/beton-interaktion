import { jsx } from '@emotion/react'
import { AppBar, Container, Divider, Grid, Input, InputAdornment, List, ListItem, Paper, Stack, styled, TextField, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import BetonSelector from './BetonSelector';
import StahlSelector from './StahlSelector';


const Label = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'right',
}));

export default function RechteckQS() {
	return <>
		<AppBar>
			<Toolbar>
				<Typography variant="h6">
					Rechteck Querschnitt
				</Typography>
			</Toolbar>
		</AppBar>
		<Container maxWidth="sm" style={{ marginTop: "70px" }}>
			<List>
				<ListItem>
					<Paper elevation={3} style={{ backgroundColor: "#fafafa", width: "100%" }}>
						<List>
							<ListItem>
								<Stack direction="row">
									<Label>Beton</Label>
									<BetonSelector />
								</Stack>
							</ListItem>
						</List>
					</Paper>
				</ListItem>

				<ListItem>
					<Paper elevation={3} style={{ backgroundColor: "#fafafa", width: "100%" }}>
						<List>
							<ListItem>
								<Stack direction="row">
									<Label>Baustahl</Label>
									<Label>B500</Label>
								</Stack>
							</ListItem>
							<Divider />
							<ListItem>
								<Label style={{ minWidth: "3em" }}>A<sub>s1</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
											<Typography style={{ marginTop: "-0.5rem", fontSize: "0.8rem" }}>
												2
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "3em" }}>A<sub>s2</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
											<Typography style={{ marginTop: "-0.5rem", fontSize: "0.8rem" }}>
												2
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "3em" }}>d<sub>1</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
						</List>
					</Paper>
				</ListItem>

				<ListItem>
					<Paper elevation={3} style={{ backgroundColor: "#fafafa", width: "100%" }}>
						<List>
							<ListItem>
								<Stack direction="row">
									<Label>Spannstahl</Label>
									<StahlSelector />
								</Stack>
							</ListItem>
							<Divider />
							<ListItem>
								<Label style={{ minWidth: "3em" }}>E<sub>p</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												N/mm
											</Typography>
											<Typography style={{ marginTop: "-0.5rem", fontSize: "0.8rem" }}>
												2
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "3em" }}>A<sub>p</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
											<Typography style={{ marginTop: "-0.5rem", fontSize: "0.8rem" }}>
												2
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "3em" }}>d<sub>p</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
						</List>
					</Paper>
				</ListItem>

				<ListItem>
					<Paper elevation={3} style={{ backgroundColor: "#fafafa", width: "100%" }}>
						<List>
							<ListItem>
								<Label>Querschnitt</Label>
							</ListItem>
							<Divider />
							<ListItem>
								<Label style={{ minWidth: "5em" }}>Breite b</Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "5em" }}>Höhe h</Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												cm
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
						</List>
					</Paper>
				</ListItem>

				<ListItem>
					<Paper elevation={3} style={{ backgroundColor: "#fafafa", width: "100%" }}>
						<List>
							<ListItem>
								<Label>Einwirkung</Label>
							</ListItem>
							<Divider />
							<ListItem>
								<Label style={{ minWidth: "5em" }}>N<sub>Ed</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												kN
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
							<ListItem>
								<Label style={{ minWidth: "5em" }}>M<sub>Ed</sub></Label>
								<TextField
									defaultValue={"20.0"}
									fullWidth={true}
									size="small"
									InputProps={{
										inputProps: {
											style: { textAlign: "right" }
										},
										endAdornment: <InputAdornment position="end">
											<Typography>
												kN
											</Typography>
										</InputAdornment>
									}}
								/>
							</ListItem>
						</List>
					</Paper>
				</ListItem>
			</List>

		</Container>
	</>
}
