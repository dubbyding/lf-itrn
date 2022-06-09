let searchByName = (obj, val) => {
	return obj.filter((o) => {
		for (i in o) {
			let j = o[i].toString();
			if (j.toUpperCase() === val.toString().toUpperCase()) {
				return true;
			}
		}
		return false;
	})[0];
};
var fruits = [
	{ id: 1, name: 'Banana', color: 'Yellow' },
	{ id: 2, name: 'Apple', color: 'Red' },
];
let output = searchByName(fruits, 'apple');
console.log(output);
