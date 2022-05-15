import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { BetonList } from './Beton';
import Graph from './Graph';
import InputCard from './InputCard';
import { SpannstahlList } from './Spannstahl';


export interface InputProps {
	label: string | ReactNode,
	value: number,
	unit: string,
	setter: Dispatch<SetStateAction<number>>
}

function Input(props: InputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setter(parseFloat(event.target.value))
	};

	let unit = <>{props.unit}</>;
	let unitTextWidth = props.unit?.length + "em";
	if (props.unit === "cm") {
		unitTextWidth = "2.5em";
	} else if (props.unit === "kN") {
		unitTextWidth = "2.3em";
	} else if (props.unit === "kNm") {
		unitTextWidth = "3.3em";
	} else if (props.unit === "cm2") {
		unit = <>cm<sup>2</sup></>
		unitTextWidth = "3em";
	} else if (props.unit === "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unitTextWidth = "4.5em";
	}

	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center" }}>
			<Form.Control type="number" style={{ width: "100%", paddingRight: unitTextWidth, textAlign: "right" }} value={props.value} onChange={handleChange}></Form.Control>
			<span style={{ position: "absolute", right: 30, color: "#888" }}>{unit}</span>
		</Col>
	</Row >
}

export default function RechteckQS() {
	const [beton, setBeton] = useState(BetonList[2]);

	// Baustahl input
	const [A_s1, set_A_s1] = useState(15.0);
	const [A_s2, set_A_s2] = useState(5.0);
	const [d_1, set_d_1] = useState(10.0);
	const [d_2, set_d_2] = useState(5.0);

	// Spannstahl input
	const [stahl, setStahl] = useState(SpannstahlList[0]);
	const [E_p, set_E_p] = useState(195000.0);
	const [A_p, set_A_p] = useState(10.0);
	const [d_p, set_d_p] = useState(10.0);

	// Querschnitt input
	const [b, set_b] = useState(50.0);
	const [h, set_h] = useState(100.0);

	// Einwirkung input
	const [N_Ed, set_N_Ed] = useState(1000.0);
	const [M_Ed, set_M_Ed] = useState(1500.0);

	return <>
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Rechteck Querschnitt</Navbar.Brand>
			</Container>
		</Navbar>

		<Container style={{ marginBottom: "1em" }}>
			<Row className="justify-content-md-center">
				<Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 6 }} lg={{ order: 1, span: 4 }} xl={{ order: 1, span: 3 }}>

					<InputCard header="Beton" options={BetonList} selectionSetter={setBeton} />

					<InputCard header="Baustahl" options={[{label: "B500"}]}>
						<Input label={<>A<sub>s1</sub></>} value={A_s1} unit="cm2" setter={set_A_s1} />
						<Input label={<>A<sub>s2</sub></>} value={A_s2} unit="cm2" setter={set_A_s2} />
						<Input label={<>d<sub>1</sub></>} value={d_1} unit="cm" setter={set_d_1} />
						<Input label={<>d<sub>2</sub></>} value={d_2} unit="cm" setter={set_d_2} />
					</InputCard>

					<InputCard header="Spannstahl" options={SpannstahlList} selectionSetter={setStahl} >
						<Input label={<>E<sub>p</sub></>} value={E_p} unit="N/mm2" setter={set_E_p} />
						<Input label={<>A<sub>p</sub></>} value={A_p} unit="cm2" setter={set_A_p} />
						<Input label={<>d<sub>p</sub></>} value={d_p} unit="cm" setter={set_d_p} />
					</InputCard>

					<InputCard header="Querschnitt">
						<Input label="Breite b" value={b} unit="cm" setter={set_b} />
						<Input label="Höhe h" value={h} unit="cm" setter={set_h} />
					</InputCard>

					<InputCard header="Einwirkung">
						<Input label={<>N<sub>Ed</sub></>} value={N_Ed} unit="kN" setter={set_N_Ed} />
						<Input label={<>M<sub>Ed</sub></>} value={M_Ed} unit="kNm" setter={set_M_Ed} />
						<p>&epsilon;<sub>p</sub><sup>(0)</sup></p>
					</InputCard>

				</Col>
				<Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 6 }} lg={{ order: 2, span: 8 }} xl={{ order: 1, span: 9 }}>

					<InputCard header="M-N-Interaktion">
						<Graph beton={beton} spannstahl={stahl} A_s1={A_s1} A_s2={A_s2} d_1={d_1} d_2={d_2} E_p={E_p} A_p={A_p} d_p={d_p} b={b} h={h} N_Ed={N_Ed} M_Ed={M_Ed} />
					</InputCard>

					<InputCard header="Widerstand">
						<p>
							N<sub>Rd</sub> = 1000.0 kN
						</p>
						<p>
							M<sub>Rd</sub> = 1698.1 kNm
						</p>
						<p>&epsilon;<sub>c</sub></p>
						<p>&epsilon;<sub>s1</sub></p>
						<p>&epsilon;<sub>s2</sub></p>
						<p>&epsilon;<sub>p</sub></p>
					</InputCard>

				</Col>
			</Row>
		</Container>
	</>
}
