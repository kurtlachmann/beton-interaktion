import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { SelectionOption } from "./InputCard";


export interface ValSelectorProps {
	label: string | JSX.Element,
	options: (string | number)[],
	setValue: Dispatch<SetStateAction<any>>,
	unit?: string,
	disabled?: boolean,
	children?: any
}

export function ValSelector(props: ValSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.setValue(props.options[event.target.selectedIndex])
	};

	return <BaseSelector label={props.label} changeHandler={handleChange} unit={props.unit} disabled={props.disabled}>
		{props.options.map((option: string | number) => (
			<option key={option} value={option}>{option}</option>
		))}
	</BaseSelector>
}


export interface ObjSelectorProps {
	label: string | JSX.Element,
	options: SelectionOption[],
	setValue: Dispatch<SetStateAction<any>>,
	unit?: string,
	disabled?: boolean,
	children?: any
}

export function ObjSelector(props: ObjSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.setValue(props.options[event.target.selectedIndex])
	};

	return <BaseSelector label={props.label} changeHandler={handleChange} unit={props.unit} disabled={props.disabled}>
		{props.options.map((option: SelectionOption) => (
			<option key={option.label} value={option.label}>{option.label}</option>
		))}
	</BaseSelector>
}


interface SelectorProps {
	label: string | JSX.Element,
	changeHandler: ChangeEventHandler<HTMLSelectElement>,
	unit?: string,
	disabled?: boolean,
	children?: any
}

function BaseSelector(props: SelectorProps) {
	let unit = <>{props.unit}</>;
	let unit_text_width = props.unit?.length + "em";
	if (props.unit === "cm") {
		unit_text_width = "3.8em";
	} else if (props.unit === "kN") {
		unit_text_width = "3.6em";
	} else if (props.unit === "kNm") {
		unit_text_width = "4.6em";
	} else if (props.unit === "cm2") {
		unit = <>cm<sup>2</sup></>
		unit_text_width = "4.2em";
	} else if (props.unit === "N/mm2") {
		unit = <>N/mm<sup>2</sup></>
		unit_text_width = "6.7em";
	}

	const add_style: React.CSSProperties = props.disabled ? { opacity: "30%", pointerEvents: "none", userSelect: "none", MozUserSelect: "none" } : {}
	const tabindex = props.disabled ? -1 : 0

	return <Row style={{ alignItems: "center", marginTop: "0.25em", marginBottom: "0.25em", ...add_style }}>
		<Col xs="auto" style={{ textAlign: "right", width: "5em" }}>{props.label}</Col>
		<Col style={{ display: "flex", alignItems: "center", position: "relative" }}>
			<Form.Select size="sm" style={{ width: "100%", paddingRight: unit_text_width, textAlign: "right" }} onChange={props.changeHandler} tabIndex={tabindex}>
				{props.children}
			</Form.Select>
			<span style={{ position: "absolute", right: 50, color: "#888", pointerEvents: "none" }}>
				{unit}
			</span>
		</Col>
	</Row>
}
