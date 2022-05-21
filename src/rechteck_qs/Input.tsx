import { ReactNode, Dispatch, SetStateAction } from "react";
import { Row, Col, Form } from "react-bootstrap";


export interface InputProps {
	label: string | ReactNode,
	defaultValue: number,
	unit: string,
	setValue: Dispatch<SetStateAction<number>>
}


// Stores the handle to the last call to setTimeout()
let timeoutHandle: NodeJS.Timeout;

export default function Input(props: InputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Trigger the real real change after a slight delay so that the UI doesn't freeze after
		// every input event.
		if (timeoutHandle) clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(() => {
			props.setValue(parseFloat(event.target.value));
		}, 1200);
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
		unitTextWidth = "2.9em";
	} else if (props.unit === "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unitTextWidth = "4.5em";
	}

	return <Row style={{ alignItems: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center" }}>
			<Form.Control type="number" style={{ width: "100%", paddingRight: unitTextWidth, textAlign: "right" }} defaultValue={props.defaultValue} onChange={handleChange}></Form.Control>
			<span style={{ position: "absolute", right: 30, color: "#888", pointerEvents: "none" }}>{unit}</span>
		</Col>
	</Row>
}