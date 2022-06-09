let obj = () => {
	/* A function that returns the education details of a person. */
	let details = {
		name: 'Raj Maharjan',
		address: 'Chamati',
		email: 'rmaharjan.rm90@gmail.com',
		interests: {
			sports: {
				1: 'football',
				2: 'table tennis',
				3: 'cricket',
			},
		},
		education: [
			{
				name: 'Adarsha Vidya Mandir Higher Secondary School',
				enrolledDate: 2000,
			},
			{
				name: 'Golden Gate International College',
				enrolledDate: 2015,
			},
			{
				name: 'Sagarmatha Engineering College',
				enrolledDate: 2018,
			},
		],
	};
	let arr = details.education;
	let val = arr.reduce((acc, cur) => {
		let current = `Name: ${cur.name}, Date: ${cur.enrolledDate}\n`;
		return [...acc, current];
	}, []);
	return val.join('');
};
let output = obj();
console.log(output);
