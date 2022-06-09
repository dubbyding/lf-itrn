// Asynchronous OPerations

// setTimeout
// let counter = 0;

// setTimeout(() => {
// 	counter++;
// 	console.log(counter);
// }, 1000);

// console.log(counter);

// setInterval

// let counter = 0;

// let intervalId = setInterval(() => {
// 	counter++;

// 	console.log(counter);
// }, 1000);

// console.log(counter);

// Stop Interval
// clearInterval(intervalId);

for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i);
	}, 1000 * (i + 1));
}
