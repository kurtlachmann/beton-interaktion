// Resets the visitor counter to 0 and adds the old value to `visitors.json`. This should be run
// each day.
// The values are hardcoded in the website's sourcecode. So for the new values to take effect
// the site has to be built and deployed after running this script.

const countapi = require('countapi-js');
const countapiCredentials = require('./countapi-credentials.json');
const fs = require('fs');
const path = require('path');
const visitors = require('./visitors.json');


/**
 * @returns Yesterday's date in the format YYYY-MM-DD
 */
function getYesterday() {
	let d = new Date();
	d.setDate(d.getDate() - 1);
	return d.toISOString().split('T')[0];
}


const yesterday = getYesterday();
console.log(`Updating stats for ${yesterday} ...`);

countapi.set(countapiCredentials.namespace, countapiCredentials.key, 0).then(result => {
	console.log("Counter successfully reset");

	// Get new counter value (before it was reset)
	visitors[yesterday] = result.old_value;

	const jsonPath = path.join(__dirname, 'visitors.json')
	const content = JSON.stringify(visitors, null, 4);

	// Overwrite old file with new values
	fs.writeFile(jsonPath, content, err => {
		if (err) {
			console.log("Error writing file: ", err);
		} else {
			console.log(`Added new entry "${yesterday}: ${result.old_value}" to ${jsonPath}`);
		}
	});
})
