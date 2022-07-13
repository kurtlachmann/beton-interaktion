import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { highlightElement, resetHighlight } from "./CrossSection";


export interface InputProps {
	label: string,
	defaultValue: number,
	unit: string,
	setValue: Dispatch<SetStateAction<number>>
	disabled?: boolean
}


export default function Input(props: InputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setValue(parseFloat(event.target.value));
	};

	const handleFocus = () => highlightElement(props.label);

	// Convert strings like e.g. "E_{p}^{0}" into "E<sub>p</sub><sup>0</sup>"
	const labelHtml = props.label.replace(/_{(.*?)}/, "<sub>$1</sub>").replace(/\^{(.*?)}/, "<sup>$1</sup>");
	const label = <span dangerouslySetInnerHTML={{ __html: labelHtml}} />;

	let unit = <>{props.unit}</>;
	let unit_text_width = props.unit?.length + "em";
	if (props.unit === "cm") {
		unit_text_width = "3em";
	} else if (props.unit === "kN") {
		unit_text_width = "3em";
	} else if (props.unit === "kNm") {
		unit_text_width = "4em";
	} else if (props.unit === "cm2") {
		unit = <>cm<sup>2</sup></>
		unit_text_width = "3.5em";
	} else if (props.unit === "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unit_text_width = "4.5em";
	}

	const add_style: React.CSSProperties = props.disabled ? { opacity: "30%", pointerEvents: "none", userSelect: "none", MozUserSelect: "none" } : {}
	const tabindex = props.disabled ? -1 : 0

	return <Row style={{alignItems: "center", marginTop: "0.25em", marginBottom: "0.25em", ...add_style }} onMouseEnter={handleFocus} onMouseLeave={resetHighlight}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{label}</Col>
		<Col style={{ display: "flex", alignItems: "center", position: "relative" }}>
			<Form.Control type="number" size="sm" style={{ width: "100%", paddingRight: unit_text_width, textAlign: "right" }} defaultValue={props.defaultValue} onChange={handleChange} tabIndex={tabindex}></Form.Control>
			<span style={{ position: "absolute", right: 30, color: "#888", pointerEvents: "none", fontSize: "0.875rem" }}>{unit}</span>
		</Col>
	</Row>
}
