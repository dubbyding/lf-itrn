// a = 10; // Global scope

// function abc() {
// 	b = 20; // Also Global Scope cause not using var or let or const
// }

// DOM
// const element = document.getElementById('user');

// element.innerHTML = 'Modified from JS';
// element.style = {
// 	backgroundColor: 'a22',
//     color: #fff,
//     borderRadius:'4px'
// };       // NOt allowed

// element.style.backgroundColor = '#a22';
// element.style.color = '#fff';
// element.style.borderRadius = '4px';

// console.log(element);

// changing border radius every few seconds

// NaN is also a number but it says that the value shouldn't be a number
// parseInt, parseFloat, Number, +'1'

// let borderRadius = parseInt(element.style.borderRadius);

// let fps = 60;
// let frameTime = 1000 / fps;

// setInterval(() => {
// 	borderRadius++;
// 	element.style.borderRadius = borderRadius + 'px';
// }, frameTime);

// To take class items

const items = document.getElementsByClassName('item');

console.log(items);

for (let i = 0; i < items.length; i++) {
	const item = items[i];

	console.log(item.getAttribute('data-customattribute'));
	item.setAttribute('data-customattribute', `attr-${i}`);

	item.style.color = '#25f';
	item.innerHTML = `Modified from JS, Index: ${i}`;
}
