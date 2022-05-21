import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { b500 } from './Baustahl';
import { BetonList } from './Beton';
import Input from './Input';
import InputCard from './InputCard';
import { BaustahlConfig, calcData, Einwirkung, Querschnitt, SpannstahlConfig } from './math';
import { SpannstahlList } from './Spannstahl';

const Graph = React.lazy(() => import('./Graph'));


function DropDown(props: any) {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.setter(props.options[event.target.selectedIndex])
	};

	let unit = <>{props.unit}</>;
	let unitTextWidth = props.unit?.length + "em";
	if (props.unit === "cm") {
		unitTextWidth = "3.8em";
	} else if (props.unit === "kN") {
		unitTextWidth = "3.6em";
	} else if (props.unit === "kNm") {
		unitTextWidth = "4.6em";
	} else if (props.unit === "cm2") {
		unit = <>cm<sup>2</sup></>
		unitTextWidth = "4.2em";
	} else if (props.unit === "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unitTextWidth = "5.7em";
	}

	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center" }}>
			<Form.Select style={{ width: "100%", paddingRight: unitTextWidth, textAlign: "right" }} value={props.value} onChange={handleChange}>
				{props.options.map((option: string | number) => (
					<option key={option} value={option}>{option}</option>
				))}
			</Form.Select>
			<span style={{ position: "absolute", right: 50, color: "#888", pointerEvents: "none" }}>
				{unit}
			</span>
		</Col>
	</Row>
}


export default function RechteckQS() {
	const [beton, setBeton] = useState(BetonList[0]);

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

	let qs: Querschnitt = {
		b: b,
		h: h
	};
	let baustahlConfig: BaustahlConfig = {
		material: b500,
		A_s1: A_s1,
		A_s2: A_s2,
		d_1: d_1,
		d_2: d_2
	};
	let spannstahlConfig: SpannstahlConfig = {
		material: stahl,
		E_p: E_p,
		A_p: A_p,
		d_p: d_p,
	};
	let einwirkung: Einwirkung = {
		N_Ed: N_Ed,
		M_Ed: M_Ed
	}
	let {M_Rd, dataPoints} = calcData(qs, beton, baustahlConfig, spannstahlConfig, einwirkung);

	return <>
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">Rechteck Querschnitt</Navbar.Brand>
			</Container>
		</Navbar>

		<Container style={{ marginBottom: "1em" }}>
			<Row className="justify-content-md-center">
				<Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 6 }} lg={{ order: 1, span: 4 }} xl={{ order: 1, span: 3 }}>

					<InputCard header="Beton" options={BetonList} selectionSetter={setBeton} />

					<InputCard header="Baustahl" options={[{label: "B500"}]}>
						<Input label={<>A<sub>s1</sub></>} defaultValue={A_s1} unit="cm2" setValue={set_A_s1} />
						<Input label={<>A<sub>s2</sub></>} defaultValue={A_s2} unit="cm2" setValue={set_A_s2} />
						<Input label={<>d<sub>1</sub></>} defaultValue={d_1} unit="cm" setValue={set_d_1} />
						<Input label={<>d<sub>2</sub></>} defaultValue={d_2} unit="cm" setValue={set_d_2} />
					</InputCard>

					<InputCard header="Spannstahl" options={SpannstahlList} selectionSetter={setStahl} >
						<DropDown label={<>E<sub>p</sub></>} options={[195000, 205000]} unit="N/mm2" setValue={set_E_p} />
						<Input label={<>A<sub>p</sub></>} defaultValue={A_p} unit="cm2" setValue={set_A_p} />
						<Input label={<>d<sub>p</sub></>} defaultValue={d_p} unit="cm" setValue={set_d_p} />
					</InputCard>

					<InputCard header="Querschnitt">
						<Input label="Breite b" defaultValue={b} unit="cm" setValue={set_b} />
						<Input label="Höhe h" defaultValue={h} unit="cm" setValue={set_h} />
					</InputCard>

					<InputCard header="Einwirkung">
						<Input label={<>N<sub>Ed</sub></>} defaultValue={N_Ed} unit="kN" setValue={set_N_Ed} />
						<Input label={<>M<sub>Ed</sub></>} defaultValue={M_Ed} unit="kNm" setValue={set_M_Ed} />
						<p>&epsilon;<sub>p</sub><sup>(0)</sup></p>
					</InputCard>

				</Col>
				<Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 6 }} lg={{ order: 2, span: 8 }} xl={{ order: 1, span: 9 }}>

					<InputCard header="M-N-Interaktion">
						<React.Suspense fallback={<div />}>
							<Graph data={dataPoints} Rd={[M_Rd, N_Ed]} Ed={[M_Ed, N_Ed]} />
						</React.Suspense>
					</InputCard>

					<InputCard header="Widerstand">
						<p>
							N<sub>Rd</sub> = {N_Ed.toFixed(1)} kN
						</p>
						<p>
							M<sub>Rd</sub> = {M_Rd.toFixed(1)} kNm
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
