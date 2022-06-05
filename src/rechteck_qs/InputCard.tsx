import React, { Dispatch, SetStateAction } from "react";
import { Card, Form } from "react-bootstrap";


export interface SelectionOption {
	label: string
}


export interface InputCardProps {
	header: string,
	options?: SelectionOption[]
	selectionSetter?: Dispatch<SetStateAction<any>>
	children?: any
}


export default function InputCard(props: InputCardProps) {

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (props.selectionSetter && props.options) {
			props.selectionSetter(props.options[event.target.selectedIndex])
		}
	}

	return <div style={{marginTop: "1.5em", marginBottom: "1.5em", marginRight: "1em"}}>
		<div style={{display: "flex", alignItems: "center", marginLeft: "0.5em", marginBottom: "1.5rem", fontWeight: "normal", fontSize: "1.2em", color: "#888", textTransform: "uppercase"}}>
		{props.header}
		{props.options &&
			<Form.Select style={{ marginLeft: "1em" }} onChange={handleChange} >
				{props.options.map((option: SelectionOption) => (
					<option key={option.label} value={option.label}>{option.label}</option>
				))}
			</Form.Select>
		}
		</div>
		{props.children}
	</div>

	// return <Card style={{ marginTop: "1em", marginBottom: "0em" }}>
	// 	<Card.Body>
	// 	{/* <Card.Header style={{ display: "flex", alignItems: "center" }}> */}
	// 		<div style={{display: "flex", alignItems: "center", marginBottom: "0em", fontWeight: "bold", fontSize: "1em"}}>
	// 		{props.header}
	// 		{props.options &&
	// 			<Form.Select style={{ marginLeft: "1em" }} disabled={props.selectionSetter === undefined} onChange={handleChange} >
	// 				{props.options.map((option: SelectionOption) => (
	// 					<option key={option.label} value={option.label}>{option.label}</option>
	// 				))}
	// 			</Form.Select>
	// 		}
	// 		</div>
	// 		<hr/>
	// 		{props.children}
	// 	{/* </Card.Header>
	// 	{props.children && <Card.Body>{props.children}</Card.Body>} */}
	// 	</Card.Body>
	// </Card>
}
