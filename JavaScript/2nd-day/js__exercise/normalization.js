let val = (object, array) => {
	/* Taking an object and returning an array of objects. */
	let children = object['children'];

	for (let i in children) {
		val(children[i], array);
	}

	if (children === undefined) {
		array.push(object);
	} else {
		let childArray = children.reduce((accumulator, currentValue) => {
			return [...accumulator, currentValue['id']];
		}, []);

		object['children'] = childArray;

		array.push(object);
	}
};

let sort = (array) => {
	/* Sorting the array. */
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[i]['id'] < array[j]['id']) {
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
	}
	return array;
};

let norm = (input) => {
	/* Taking the input object and returning an array of objects. */
	let array = [];

	for (let i in input) {
		val(input[i], array);
	}

	array = sort(array);

	return array;
};
var input = {
	1: {
		id: 1,
		name: 'John',
		children: [
			{ id: 2, name: 'Sally' },
			{ id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] },
		],
	},
	5: {
		id: 5,
		name: 'Mike',
		children: [{ id: 6, name: 'Peter' }],
	},
};
let output = norm(input);
console.log(output);
