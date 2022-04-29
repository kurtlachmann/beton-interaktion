import { Card, Col, Container, Dropdown, DropdownButton, Form, Navbar, Row } from 'react-bootstrap';


function InputCard(props: any) {
	return <Card style={{ marginTop: "1em", marginBottom: "0em" }}>
		<Card.Header style={{ display: "flex", alignItems: "center" }}>
			{props.header}
			{props.options &&
				<Form.Select style={{ marginLeft: "1em" }} disabled={props.options.length < 2} >
					{props.options.map((option: string) => (
						<option key={option} value={option}>{option}</option>
					))}
				</Form.Select>
			}
		</Card.Header>
		{props.children && <Card.Body>{props.children}</Card.Body>}
	</Card>
}

function Input(props: any) {
	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col><Form.Control type="number"></Form.Control></Col>
	</Row>
}

export default function RechteckQS() {
	return <>
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Rechteck Querschnitt</Navbar.Brand>
			</Container>
		</Navbar>

		<Container style={{ marginBottom: "1em" }}>
			<Row className="justify-content-md-center">
				<Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 4 }} lg={{ order: 1, span: 3 }}>

					<InputCard header="Beton" options={["C12/15", "C15/20", "C20/25", "C25/30", "C30/37"]} />

					<InputCard header="Baustahl" options={["B500"]}>
						<Input label={<>A<sub>s1</sub></>} />
						<Input label={<>A<sub>s2</sub></>} />
						<Input label={<>d<sub>1</sub></>} />
						<Input label={<>d<sub>2</sub></>} />
					</InputCard>

					<InputCard header="Spannstahl" options={["St 1375/1570", "St 1470/1670", "St 1570/1770", "St 1660/1860"]}>
						<Input label={<>E<sub>p</sub></>} />
						<Input label={<>A<sub>p</sub></>} />
						<Input label={<>d<sub>p</sub></>} />
					</InputCard>

					<InputCard header="Querschnitt">
						<Input label="Breite b" />
						<Input label="Höhe h" />

					</InputCard>

				</Col>
				<Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 8 }} lg={{ order: 2, span: 9 }}>

					<InputCard header="M-N-Interaktion">GRAPH</InputCard>



					<InputCard header="Widerstand">TODO</InputCard>

				</Col>
			</Row>
		</Container>
	</>
}
