import React, { Dispatch, SetStateAction, TransitionStartFunction, useState } from "react";
import { Row, Col, Form } from "react-bootstrap"


const style: React.CSSProperties = {fontSize: "0.8em", fontWeight: "bold", color: "#888", textTransform: "uppercase", marginTop: "1.5em", marginBottom: "0.5em"};


export interface SectionProps {
	title: string,
	children: any
}

export default function Section(props: SectionProps) {
	return <>
		<Row style={style}>
			<Col><hr/></Col>
			<Col xs="auto" style={{margin: "auto"}}>
				{props.title}
			</Col>
			<Col><hr/></Col>
		</Row>
		<Row>
			{props.children}
		</Row>
	</>
}


export interface OptionalSectionProps {
	title: string,
	children: any
	active: boolean,
	setActive: Dispatch<SetStateAction<any>>
}


export function OptionalSection(props: OptionalSectionProps) {
	// Decouble UI from real state. This is here so the UI is refreshed immediately. Refreshing
	// the graph is triggered with a delay by setting the `props.active` state.
	const [disabled, setDisabled] = useState(true);

	const on_checkbox_changed = (event: React.ChangeEvent<HTMLInputElement>) => {
		return;
	};
	const on_label_clicked = () => {
		setDisabled(!disabled);

		setTimeout(() => {
			props.setActive(!props.active);
		}, 0);
	}

	let clones = React.Children.map(props.children, child => {
        return React.cloneElement(child, { disabled: disabled });
    });

	return <>
		<Row style={style}>
			<Col><hr/></Col>
			<Col style={{margin: "auto"}} onClick={on_label_clicked}>
				<Form.Check style={{margin: "auto", minHeight: 0}} checked={!disabled} label={props.title} onChange={on_checkbox_changed} />
			</Col>
			<Col><hr/></Col>
		</Row>
		<Row>
			{clones}
		</Row>
	</>
}