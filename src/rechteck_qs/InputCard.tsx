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

	return <Card style={{ marginTop: "1em", marginBottom: "0em" }}>
		<Card.Header style={{ display: "flex", alignItems: "center" }}>
			{props.header}
			{props.options &&
				<Form.Select style={{ marginLeft: "1em" }} disabled={props.selectionSetter === undefined} onChange={handleChange} >
					{props.options.map((option: SelectionOption) => (
						<option key={option.label} value={option.label}>{option.label}</option>
					))}
				</Form.Select>
			}
		</Card.Header>
		{props.children && <Card.Body>{props.children}</Card.Body>}
	</Card>
}
