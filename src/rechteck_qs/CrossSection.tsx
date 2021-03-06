import { useEffect, useState } from "react";


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

	for (const element of document.getElementsByClassName("elem-" + id)) {
		element.setAttribute("stroke", "#f00");
	}

	lastHighlighted = id;
}


export function resetHighlight() {
	for (const element of document.getElementsByClassName("text-" + lastHighlighted)) {
		element.setAttribute("fill", "#888");
		element.setAttribute("stroke", "none");
		element.setAttribute("font-weight", "normal");
	}

	for (const lineElement of document.getElementsByClassName("line-" + lastHighlighted)) {
		lineElement.setAttribute("stroke", "#888");
	}

	for (const element of document.getElementsByClassName("elem-" + lastHighlighted)) {
		element.setAttribute("stroke", "#000");
		element.setAttribute("font-weight", "normal");
	}
}


export interface CrossSectionProps {
	width: number,
	height: number,
	d_1: number,
	d_2: number,
	d_p: number,
	showBewehrungOben?: boolean,
	showBewehrungUnten?: boolean,
	showSpannglied?: boolean
}


function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}


export function CrossSection(props: CrossSectionProps) {
	const dimensions = useWindowDimensions();
	const smallScreen = dimensions.width < 1200;

	const maxWidth = 50;
	const maxHeight = smallScreen ? 100 : 180;
	const stroke_width = 0.5;

	const whRatio = props.width / props.height;
	const maxWhRatio = maxWidth / maxHeight;
	const width = whRatio > maxWhRatio ? maxWidth : whRatio * maxHeight;
	const height = whRatio > maxWhRatio ? maxWidth / whRatio : maxHeight;
	const yScale = height / props.height;

	const marginTop = 5;
	const bwrgMargin = width * 0.18;  // Abstand Bewehrung links/rechts
	const spglSize = 2;  // Gr????e Spannglied
	const labelsMargin = 5;

	return <svg viewBox={`0 0 100 ${maxHeight + 20}`} style={{ backgroundColor: "#fff", transition: "all 0.5s" }} >
		<rect x={(100 - width) / 2} y={marginTop} width={width} height={height} stroke="#666" strokeWidth={stroke_width} fill="#eee" style={{ transition: "all 0.5s" }} />

		{/* Bewehrung oben */}
		<g opacity={props.showBewehrungOben ? 1 : 0} style={{ transition: "all 0.5s" }}>
			<Line className="elem-As2" x1={(100 - width) / 2 + bwrgMargin} y1={marginTop + props.d_2 * yScale} x2={(100 + width) / 2 - bwrgMargin} y2={marginTop + props.d_2 * yScale} />

			{/* Label d_2 */}
			<Line className="line-d2" x1={(100 + width) / 2 + labelsMargin} y1={marginTop} x2={(100 + width) / 2 + labelsMargin} y2={marginTop + props.d_2 * yScale} stroke="#888" strokeWidth={0.3} />
			<Text className="text-d2" x={(100 + width) / 2 + labelsMargin + 4.5} y={marginTop + (yScale * props.d_2 / 2)} text="d" sub="2" color="#888" />
		</g>

		{/* Bewehrung unten */}
		<g opacity={props.showBewehrungUnten ? 1 : 0} style={{ transition: "all 0.5s" }}>
			<Line className="elem-As1" x1={(100 - width) / 2 + bwrgMargin} y1={marginTop + height - props.d_1 * yScale} x2={(100 + width) / 2 - bwrgMargin} y2={marginTop + height - props.d_1 * yScale} />

			{/* Label d_1 */}
			<Line className="line-d1" x1={(100 + width) / 2 + labelsMargin} y1={marginTop + height - props.d_1 * yScale} x2={(100 + width) / 2 + labelsMargin} y2={marginTop + height} stroke="#888" strokeWidth={0.3} />
			<Text className="text-d1" x={(100 + width) / 2 + labelsMargin + 4.5} y={marginTop + height - (yScale * props.d_1 / 2)} text="d" sub="1" color="#888" />
		</g>

		{/* Spannglied */}
		<g opacity={props.showSpannglied ? 1 : 0} style={{ transition: "all 0.5s" }} transform={`translate(0,${marginTop + height - props.d_p * yScale})`}>
			<Line className="elem-Ap" x1={50 - spglSize} y1={+spglSize} x2={50 + spglSize} y2={-spglSize} />
			<Line className="elem-Ap" x1={50 - spglSize} y1={-spglSize} x2={50 + spglSize} y2={+spglSize} />

			{/* Label d_p */}
			<Line className="line-dp" x1={(100 + width) / 2 + labelsMargin + 10} y1={0} x2={(100 + width) / 2 + labelsMargin + 10} y2={props.d_p * yScale} stroke="#888" strokeWidth={0.3} />
			<Text className="text-dp" x={(100 + width) / 2 + labelsMargin + 15} y={yScale * props.d_p / 2} text="d" sub="p" color="#888" />
		</g>

		{/* Label h */}
		<Line className="line-h" x1={(100 - width) / 2 - labelsMargin} y1={marginTop} x2={(100 - width) / 2 - labelsMargin} y2={marginTop + height} stroke="#888" strokeWidth={0.3} />
		<Text className="text-h" x={(100 - width) / 2 - labelsMargin - 4} y={marginTop + height / 2} text="h" color="#888" />

		{/* Label b */}
		<Line className="line-b" x1={(100 - width) / 2} y1={marginTop + height + labelsMargin} x2={(100 + width) / 2} y2={marginTop + height + labelsMargin} stroke="#888" strokeWidth={0.3} />
		<Text className="text-b" x={50} y={marginTop + height + labelsMargin + 6} text="b" color="#888" />
	</svg>
}


function Line(props: { className?: string, x1: number, y1: number, x2: number, y2: number, stroke?: string, strokeWidth?: number }) {
	return <path className={props.className} d={`M ${props.x1},${props.y1} L ${props.x2},${props.y2}`} style={{ transition: "d 0.5s" }} stroke={props.stroke || "#000"} strokeWidth={props.strokeWidth || 0.5} />
}


function Text(props: { className: string, x: number, y: number, text: string, sub?: string, color?: string }) {
	return <text className={props.className} dominantBaseline="middle" textAnchor="middle" style={{ fontSize: "4.3", transition: "transform 0.5s" }} fill={props.color} transform={`translate(${props.x}, ${props.y})`} >
		{props.text}
		<tspan baselineShift="sub" style={{ fontSize: "0.7em" }}>{props.sub}</tspan>
	</text>
}
