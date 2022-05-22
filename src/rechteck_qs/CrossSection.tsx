import { Card } from "react-bootstrap";


function CrossSection() {
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
		<svg width={width + stroke_width + padding.left + padding.right} height={height + stroke_width + padding.top + padding.bottom} style={{display: "block"}}>
			<rect x={stroke_width/2 + padding.left} y={stroke_width/2 + padding.top} width={width} height={height} stroke="#666" strokeWidth={stroke_width} fill="#eee" />

			{/* Labels on the sides */}
			<line x1={padding.left - 10} x2={padding.left - 10} y1={padding.top} y2={padding.top + height} stroke="#000" />
			<Text x={padding.left - 25} y={padding.top + height / 2} text="h" />

			<Text x={padding.left + width/2} y={padding.top + height + 25} text="b" />
			<line x1={padding.left} x2={padding.left + width} y1={padding.top + height + 10} y2={padding.top + height + 10} stroke="#000" />

			<Text x={padding.left + width + 25} y={padding.top + baustahl_margin/2} text="d" sub="2" />
			<line x1={padding.left + width + 10} x2={padding.left + width + 10} y1={padding.top} y2={padding.top + baustahl_margin} stroke="#000" />

			<Text x={padding.left + width + 25} y={padding.top + height - baustahl_margin/2} text="d" sub="1" />
			<line x1={padding.left + width + 10} x2={padding.left + width + 10} y1={padding.top + height - baustahl_margin} y2={padding.top + height} stroke="#000" />

			<Text x={padding.left + width + 65} y={padding.top + height - height*(1-0.6)*0.5} text="d" sub="p" />
			<line x1={padding.left + width + 50} x2={padding.left + width + 50} y1={padding.top + height*0.6} y2={padding.top + height} stroke="#000" />

			{/* Content inside the rect */}
			<BaustahlCircle x={padding.left + baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle x={padding.left + 2*baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle x={padding.left + 3*baustahl_margin} y={padding.top + baustahl_margin} />
			<BaustahlCircle x={padding.left + 4*baustahl_margin} y={padding.top + baustahl_margin} />
			<Text x={padding.left + width*0.5} y={padding.top + baustahl_margin + 25} text="A" sub="s2" />

			<Text x={padding.left + width/2} y={padding.top + height * 0.6 - 30} text="A" sub="p" />
			<SpannstahlCircle x={padding.left + width / 2} y={padding.top + height * 0.6} />

			<Text x={padding.left + width*0.5} y={padding.top + height - baustahl_margin - 25} text="A" sub="s1" />
			<BaustahlCircle x={padding.left + baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle x={padding.left + 2*baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle x={padding.left + 3*baustahl_margin} y={padding.top + height - baustahl_margin} />
			<BaustahlCircle x={padding.left + 4*baustahl_margin} y={padding.top + height - baustahl_margin} />
		</svg>
	</>
}


function Text(props: {x: number, y: number, text: string, sub?: string}) {
	return <text x={props.x} y={props.y} dominant-baseline="middle" text-anchor="middle">
		{props.text}
		<tspan baseline-shift="sub" style={{fontSize: "0.7em"}}>{props.sub}</tspan>
	</text>
}


function BaustahlCircle(props: {x: number, y: number}) {
	return <circle cx={props.x} cy={props.y} r={6} stroke={"#666"} strokeWidth={2} fill={"#aaa"} />
}


function SpannstahlCircle(props: {x: number, y: number}) {
	return <circle cx={props.x} cy={props.y} r={12} stroke={"#666"} strokeWidth={2} fill={"#aaa"} />
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
