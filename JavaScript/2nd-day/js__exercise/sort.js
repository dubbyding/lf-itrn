let sorting = (arr, key) => {
	/* Sorting an array of objects by a key. */
	let comb = [];
	let index = [];
	arr.forEach((val, i) => {
		comb.push(val[key]);
		index.push(i);
	});
	for (let i = 0; i < comb.length; i++) {
		for (let j = 0; j < comb.length; j++) {
			if (comb[i] < comb[j]) {
				[comb[i], comb[j]] = [comb[j], comb[i]];
				[index[i], index[j]] = [index[j], index[i]];
			}
		}
	}
	return index.reduce((acc, cur) => {
		return [...acc, arr[cur]];
	}, []);
};
let arr = [
	{
		id: 1,
		name: 'John',
	},
	{
		id: 2,
		name: 'Mary',
	},
	{
		id: 3,
		name: 'Andrew',
	},
];

let output = sorting(arr, 'name');
console.log(output);
