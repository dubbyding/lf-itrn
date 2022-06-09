let transform = (collection, transFunc) => {
	/* Creating an empty array, then iterating through the collection and pushing the transFunc(val) into
    the array. */
	let arr = [];
	collection.forEach((val) => {
		arr.push(transFunc(val));
	});
	return arr;
};

let numbers = [1, 2, 3, 4];
let output = transform(numbers, function (num) {
	return num * 2;
});

console.log(output);
