import { Card, Col, Container, Dropdown, DropdownButton, Form, Navbar, Row } from 'react-bootstrap';
import Graph from './Graph';


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
	let unit = props.unit;
	let unitTextWidth = props.unit?.length;
	if (props.unit == "cm") {
		unitTextWidth = "2.5em";
	} else if (props.unit == "kN") {
		unitTextWidth = "2.3em";
	} else if (props.unit == "kNm") {
		unitTextWidth = "3.3em";
	} else if (props.unit == "cm2") {
		unit = <>cm<sup>2</sup></>
		unitTextWidth = "3em";
	} else if (props.unit == "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unitTextWidth = "4.5em";
	}
	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center" }}>
			<Form.Control type="number" style={{ width: "100%", paddingRight: unitTextWidth, textAlign: "right" }} value={props.default}></Form.Control>
			<span style={{ position: "absolute", right: 30, color: "#888" }}>{unit}</span>
		</Col>
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
						<Input label={<>A<sub>s1</sub></>} default="20.0" unit="cm2" />
						<Input label={<>A<sub>s2</sub></>} default="0.0" unit="cm2" />
						<Input label={<>d<sub>1</sub></>} default="5.0" unit="cm" />
						<Input label={<>d<sub>2</sub></>} default="5.0" unit="cm" />
					</InputCard>

					<InputCard header="Spannstahl" options={["St 1375/1570", "St 1470/1670", "St 1570/1770", "St 1660/1860"]}>
						<Input label={<>E<sub>p</sub></>} default="19500" unit="N/mm2" />
						<Input label={<>A<sub>p</sub></>} default="10.0" unit="cm2" />
						<Input label={<>d<sub>p</sub></>} default="10.0" unit="cm" />
					</InputCard>

					<InputCard header="Querschnitt">
						<Input label="Breite b" default="50" unit="cm" />
						<Input label="Höhe h" default="100" unit="cm" />
					</InputCard>

					<InputCard header="Einwirkung">
						<Input label={<>N<sub>Ed</sub></>} default="1000.0" unit="kN" />
						<Input label={<>M<sub>Ed</sub></>} default="1500.0" unit="kNm" />
					</InputCard>

				</Col>
				<Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 8 }} lg={{ order: 2, span: 9 }}>

					<InputCard header="M-N-Interaktion">
						<Graph />
					</InputCard>

					<InputCard header="Widerstand">
						<p>
							N<sub>Rd</sub> = 1000.0 kN
						</p>
						<p>
							M<sub>Rd</sub> = 1698.1 kNm
						</p>
					</InputCard>

				</Col>
			</Row>
		</Container>
	</>
}
