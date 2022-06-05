import React, { useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { b500, BaustahlList } from './Baustahl';
import { BetonList } from './Beton';
import { CrossSection } from './CrossSection';
import { ObjSelector, ValSelector } from './Selector';
import Input from './Input';
import InputCard from './InputCard';
import { BaustahlConfig, calc_data, Einwirkung, Querschnitt, SpannstahlConfig } from './math';
import Section, { OptionalSection } from './Section';
import { SpannstahlList } from './Spannstahl';

const Graph = React.lazy(() => import('./Graph'));


function LabeledField(props: { label: any, value: any }) {
	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ textAlign: "right", marginRight: "1em" }}>{props.value}</Col>
	</Row>
}


export default function RechteckQS() {
	// Querschnitt input
	const [beton, setBeton] = useState(BetonList[0]);
	const [b, set_b] = useState(50.0);
	const [h, set_h] = useState(100.0);

	// Baustahl input
	const [A_s1, set_A_s1] = useState(15.0);
	const [A_s2, set_A_s2] = useState(5.0);
	const [d_1, set_d_1] = useState(10.0);
	const [d_2, set_d_2] = useState(5.0);

	// Spannstahl input
	const [spanngliedActive, setSpanngliedActive] = useState(false);
	const [stahl, setStahl] = useState(SpannstahlList[0]);
	const [E_p, set_E_p] = useState(195000.0);
	const [A_p, set_A_p] = useState(10.0);
	const [d_p, set_d_p] = useState(10.0);

	// Einwirkung input
	const [N_Ed, set_N_Ed] = useState(1000.0);
	const [M_Ed, set_M_Ed] = useState(1500.0);

	const qs: Querschnitt = {
		b: b,
		h: h
	};
	const baustahl_cfg: BaustahlConfig = {
		material: b500,
		A_s1: A_s1,
		A_s2: A_s2,
		d_1: d_1,
		d_2: d_2
	};
	const spannstahl_cfg: SpannstahlConfig = {
		material: stahl,
		E_p: E_p,
		A_p: A_p,
		d_p: d_p,
	};
	const einwirkung: Einwirkung = {
		N_Ed: N_Ed,
		M_Ed: M_Ed
	}
	const { interpolated, MN_data_points } = calc_data(qs, beton, baustahl_cfg, spannstahl_cfg, einwirkung);

	const e_p0 = A_p === 0 ? 0 : 1000 * (N_Ed / A_p) / (0.1 * E_p);

	return <>
		<Navbar bg="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/beton-interaktion" style={{color: "#fff"}}>Rechteck Querschnitt</Navbar.Brand>
			</Container>
		</Navbar>

		<Container style={{ marginBottom: "1em" }} fluid>
			<Row className="justify-content-md-center" style={{marginTop: "2em"}}>
				<Col xl={2}>
					<div style={{marginTop: "1em", marginBottom: "1.5em"}}>
						<CrossSection />
					</div>
				</Col>
				<Col xs={{ order: 2, span: 12 }} md={{ order: 1, span: 6 }} lg={{ order: 1, span: 4 }} xl={{ order: 1, span: 2 }}>

					<Section title="Querschnitt">
						<ObjSelector label="Beton" options={BetonList} setValue={setBeton} />
						<Input label="b" defaultValue={b} unit="cm" setValue={set_b} />
						<Input label="h" defaultValue={h} unit="cm" setValue={set_h} />
					</Section>

					<Section title="Bewehrung">
						<ObjSelector label="Stahl" options={BaustahlList} setValue={() => {}} />
						<Input label={<>A<sub>s1</sub></>} defaultValue={A_s1} unit="cm2" setValue={set_A_s1} />
						<Input label={<>d<sub>1</sub></>} defaultValue={d_1} unit="cm" setValue={set_d_1} />
						<Input label={<>A<sub>s2</sub></>} defaultValue={A_s2} unit="cm2" setValue={set_A_s2} />
						<Input label={<>d<sub>2</sub></>} defaultValue={d_2} unit="cm" setValue={set_d_2} />
					</Section>

					<OptionalSection title="Spannglied" active={spanngliedActive} setActive={setSpanngliedActive}>
						<ObjSelector label="Stahl" options={SpannstahlList} setValue={setStahl} />
						<ValSelector label={<>E<sub>p</sub></>} options={[195000, 205000]} unit="N/mm2" setValue={set_E_p} />
						<Input label={<>A<sub>p</sub></>} defaultValue={A_p} unit="cm2" setValue={set_A_p} />
						<Input label={<>d<sub>p</sub></>} defaultValue={d_p} unit="cm" setValue={set_d_p} />
					</OptionalSection>

					<Section title="Einwirkung">
						<Input label={<>N<sub>Ed</sub></>} defaultValue={N_Ed} unit="kN" setValue={set_N_Ed} />
						<Input label={<>M<sub>Ed</sub></>} defaultValue={M_Ed} unit="kNm" setValue={set_M_Ed} />
						<LabeledField label={<>&epsilon;<sub>p</sub><sup>(0)</sup></>} value={<>{e_p0.toFixed(3)} &permil;</>} />
					</Section>

				</Col>
				<Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 6 }} lg={{ order: 2, span: 8 }} xl={{ order: 1, span: 6 }} style={{paddingLeft: "2em"}}>

					<React.Suspense fallback={<div/>}>
						<Graph data={MN_data_points} Rd={[interpolated.M_Rd, interpolated.N_Rd]} Ed={[M_Ed, N_Ed]} />
					</React.Suspense>

					<Row>
						<Col>
							<InputCard header="Widerstand">
								<p>
									N<sub>Rd</sub> = {interpolated.N_Rd.toFixed(1)} kN
								</p>
								<p>
									M<sub>Rd</sub> = {interpolated.M_Rd.toFixed(1)} kNm
								</p>
								<p>&epsilon;<sub>c</sub> = {interpolated.e_c.toFixed(3)} &permil;</p>
								<p>&epsilon;<sub>s1</sub> = {interpolated.e_s1.toFixed(3)} &permil;</p>
								<p>&epsilon;<sub>s2</sub> = {interpolated.e_s2.toFixed(3)} &permil;</p>
								<p>&epsilon;<sub>p</sub> = {interpolated.e_p.toFixed(3)} &permil;</p>
							</InputCard>
						</Col>
					</Row>

				</Col>
			</Row>
		</Container>
	</>
}
