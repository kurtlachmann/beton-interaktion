import { ReactNode, Dispatch, SetStateAction } from "react";
import { Row, Col, Form } from "react-bootstrap";


export interface InputProps {
	label: string | ReactNode,
	defaultValue: number,
	unit: string,
	setValue: Dispatch<SetStateAction<number>>
	disabled?: boolean
}


// Stores the handle to the last call to setTimeout()
let timeout_handle: NodeJS.Timeout;

export default function Input(props: InputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Trigger the real real change after a slight delay so that the UI doesn't freeze after
		// every input event.
		if (timeout_handle) clearTimeout(timeout_handle);
		timeout_handle = setTimeout(() => {
			props.setValue(parseFloat(event.target.value));
		}, 1200);
	};

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

	return <Row style={{alignItems: "center", marginTop: "0.25em", marginBottom: "0.25em", ...add_style }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center", position: "relative" }}>
			<Form.Control type="number" size="sm" style={{ width: "100%", paddingRight: unit_text_width, textAlign: "right" }} defaultValue={props.defaultValue} onChange={handleChange} tabIndex={tabindex}></Form.Control>
			<span style={{ position: "absolute", right: 30, color: "#888", pointerEvents: "none", fontSize: "0.875rem" }}>{unit}</span>
		</Col>
	</Row>
}