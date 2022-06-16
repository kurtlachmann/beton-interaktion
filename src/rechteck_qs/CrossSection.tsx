import { Card } from "react-bootstrap";


export enum CrossSectionElement {
	HEIGHT,
	WIDTH,
	A_S1,
	A_S2,
	A_P,
	D_1,
	D_2,
	D_P
}


let lastHighlighted: string = "";


export function highlightElement(id: string) {
	// Transform e.g. "E_{p}^{0}" into "Ep0"
	id = id.replace(/_{(.*?)}/, "$1").replace(/^{(.*?)}/, "$1");

	resetHighlight();

	// Color in new highlighted element
	for (const element of document.getElementsByClassName("text-" + id)) {
		element.setAttribute("fill", "#f00");
		element.setAttribute("font-weight", "bold");
	}

	for (const lineElement of document.getElementsByClassName("line-" + id)) {
		lineElement.setAttribute("stroke", "#f00");
	}

	for (const circleElement of document.getElementsByClassName("circle-" + id)) {
		circleElement.setAttribute("stroke", "#f00");
		circleElement.setAttribute("fill", "#faa");
	}

	lastHighlighted = id;
}


export function resetHighlight() {
	for (const element of document.getElementsByClassName("text-" + lastHighlighted)) {
		element.setAttribute("fill", "#000");
		element.setAttribute("stroke", "none");
		element.setAttribute("font-weight", "normal");
	}

	for (const lineElement of document.getElementsByClassName("line-" + lastHighlighted)) {
		lineElement.setAttribute("stroke", "#000");
	}

	for (const circleElement of document.getElementsByClassName("circle-" + lastHighlighted)) {
		circleElement.setAttribute("stroke", "#666");
		circleElement.setAttribute("fill", "#aaa");
	}
}


export function CrossSection(props: {activeElement?: CrossSectionElement, showSpannglied?: boolean}) {
	const padding = {
		top: 10,
		bottom: 35,
		left: 35,
		right: 80,
	};
	const width = 150;
	const height = 250;
	const stroke_width = 2;

	const baustahl_margin = width / 5;
	return <>
		<svg width={width + stroke_width + padding.left + padding.right} height={height + stroke_width + padding.top + padding.bottom} style={{display: "block", margin: "auto"}}>
			<rect x={stroke_width/2 + padding.left} y={stroke_width/2 + padding.top} width={width} height={height} stroke="#666" strokeWidth={stroke_width} fill="#eee" />

			{/* Labels on the sides */}
			<line className="line-h" x1={padding.left - 10} x2={padding.left - 10} y1={padding.top} y2={padding.top + height} stroke="#000" />
			<Text className="text-h" x={padding.left - 25} y={padding.top + height / 2} text="h" />

			<Text className="text-b" x={padding.left + width/2} y={padding.top + height + 25} text="b" />
			<line className="line-b" x1={padding.left} x2={padding.left + width} y1={padding.top + height + 10} y2={padding.top + height + 10} stroke="#000" />

			<Text className="text-d2" x={padding.left + width + 25} y={padding.top + baustahl_margin/2} text="d" sub="2" />
			<line className="line-d2" x1={padding.left + width + 10} x2={padding.left + width + 10} y1={padding.top} y2={padding.top + baustahl_margin} stroke="#000" />

			<Text className="text-d1" x={padding.left + width + 25} y={padding.top + height - baustahl_margin/2} text="d" sub="1" />
			<line className="line-d1" x1={padding.left + width + 10} x2={padding.left + width + 10} y1={padding.top + height - baustahl_margin} y2={padding.top + height} stroke="#000" />

			{props.showSpannglied && <>
				<Text className="text-dp" x={padding.left + width + 65} y={padding.top + height - height*(1-0.6)*0.5} text="d" sub="p" />
				<line className="line-dp" x1={padding.left + width + 50} x2={padding.left + width + 50} y1={padding.top + height*0.6} y2={padding.top + height} stroke="#000" />
			</>}

			{/* Content inside the rect */}
			<BaustahlCircle className="circle-As2" x={padding.left + baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle className="circle-As2" x={padding.left + 2*baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle className="circle-As2" x={padding.left + 3*baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle className="circle-As2" x={padding.left + 4*baustahl_margin} y={padding.top + baustahl_margin} />
			<Text className="text-As2" x={padding.left + width*0.5} y={padding.top + baustahl_margin + 25} text="A" sub="s2" />

			{props.showSpannglied && <>
				<Text className="text-Ap" x={padding.left + width/2} y={padding.top + height * 0.6 - 30} text="A" sub="p" />
				<SpannstahlCircle className="circle-Ap" x={padding.left + width / 2} y={padding.top + height * 0.6} />
			</>}

			<Text className="text-As1" x={padding.left + width*0.5} y={padding.top + height - baustahl_margin - 25} text="A" sub="s1" />
			<BaustahlCircle className="circle-As1" x={padding.left + baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle className="circle-As1" x={padding.left + 2*baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle className="circle-As1" x={padding.left + 3*baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle className="circle-As1" x={padding.left + 4*baustahl_margin} y={padding.top + height - baustahl_margin} />
		</svg>
	</>
}


function Text(props: {className: string, x: number, y: number, text: string, sub?: string, color?: string}) {
	return <text className={props.className} x={props.x} y={props.y} dominantBaseline="middle" textAnchor="middle" >
		{props.text}
		<tspan baselineShift="sub" style={{fontSize: "0.7em"}}>{props.sub}</tspan>
	</text>
}


function BaustahlCircle(props: {className: string, x: number, y: number}) {
	return <circle className={props.className} cx={props.x} cy={props.y} r={6} stroke="#666" strokeWidth={2} fill="#aaa" />
}


function SpannstahlCircle(props: {className: string, x: number, y: number}) {
	return <circle className={props.className} cx={props.x} cy={props.y} r={12} stroke={"#666"} strokeWidth={2} fill={"#aaa"} />
}


export default function CrossSectionCard() {
	return <Card style={{ marginTop: "1em", marginBottom: "0em" }}>
		<Card.Header style={{ display: "flex", alignItems: "center" }}>
			Querschnitt
		</Card.Header>

		<Card.Body style={{ display: "flex", justifyContent: "center" }}>
			<CrossSection />
		</Card.Body>

	</Card>
}
