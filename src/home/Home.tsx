import { Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return <>
		<Container maxWidth="sm">
			<Paper>
				<Typography variant="h2">Beton Interaktion</Typography>
				<Button>
					<Link to='/rechteck_qs'>Rechteck Querschnitt</Link>
				</Button>
			</Paper>
		</Container>
	</>
}

export default Home