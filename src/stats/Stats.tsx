import countapi from 'countapi-js';
import { Container } from "react-bootstrap";
import countapiCredentials from './countapi-credentials.json';
import visitors from './visitors.json';


// Importing this component will automatically increase the counter.
// Don't count if someone is directly going to our /stats page.
if (!window.location.href.endsWith("stats")) {
	countapi.hit(countapiCredentials.namespace, countapiCredentials.key);
}


export default function Stats() {
	return <Container>
		<h1>Statistics</h1>
		<div style={{ color: "#888", fontSize: "1.4em" }}>Daily visitors</div>
		<div>
			{Object.entries(visitors).map(([key, value]) =>
				<div key={key} style={{ margin: 0 }}>
					<span style={{ marginRight: "1em" }}>{key}</span>
					<span style={{ marginRight: "1em" }}>-</span>
					<span>{value as number}</span>
				</div>
			)}
		</div>
	</Container>
}
