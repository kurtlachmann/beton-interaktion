import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
	return <>
		<Container style={{ marginTop: "1em" }}>
			<Row className="justify-content-md-center">
				<Col xs={12} style={{textAlign: "center"}}>
					<h1>BETON INTERAKTION</h1>
					<Link to='/rechteck_qs'>Rechteck Querschnitt</Link>
				</Col>
			</Row>
		</Container>
	</>
}

export default Home