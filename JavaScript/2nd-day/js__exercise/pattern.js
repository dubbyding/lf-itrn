function pattern() {
	/* Creating a pyramid of stars. */
	let a = [];

	for (let i = 0; i < 5; i++) {
		for (let j = 5; j > 0 + i; j--) {
			a.push('*');
		}
		a.push('\n');
	}
	return a.join('');
}
let output = pattern();
console.log(output);
