class Objects {
	/* Creating a class called BallBounce. */
	/**
	 * This function creates a new object with the properties elementId, element, color, and id.
	 * @param elementId - The id of the element you want to change the color of.
	 * @param color - The color of the circle.
	 * @param id - The id of the element.
	 */
	constructor(elementId, color, id) {
		this.elementId = elementId;
		this.element = document.getElementById(this.elementId);
		this.color = color;
		this.id = id;
	}

	/* Generating random points on the canvas. */
	getPoints = (pointsAmount) => {
		let points = [];
		let x, y, width, mass;

		for (let i = 0; i < pointsAmount; i++) {
			let j = 0;

			/* Generating random circles with random coordinates, width, and mass. */
			do {
				/* Creating a new point every time the loop runs. */
				if (points.length == 0) {
					x = getRndInteger(20, window.innerHeight - 20);
					y = getRndInteger(20, window.innerWidth - 20);
					width = getRndInteger(10, 20);
					mass = getRndInteger(1, 2);

					j++;

					points = [
						...points,
						{
							x,
							y,
							width,
							mass,
						},
					];

					continue;
				}
				let radius, distance;

				let neighbourX = points[j].x;
				let neighbourY = points[j].y;
				let neighbourWidth = points[j].width;
				let neighbourMass = points[j].mass;

				/* Calculating the center of the neighbour circle and the radius of the neighbour circle. */
				let neighbourCenterX = (neighbourX + neighbourWidth) / 2;
				let neighbourCenterY = (neighbourY + neighbourWidth) / 2;

				let neighbourRadius = (neighbourMass * neighbourWidth) / 2;

				/* Generating random coordinates for a circle. */
				do {
					x = getRndInteger(20, window.innerHeight - 50);
					y = getRndInteger(20, window.innerWidth - 50);
					width = getRndInteger(10, 20);
					mass = getRndInteger(1, 2);

					/* Generating Center and radius of randomly generated circle */
					let centerX = (x + width) / 2;
					let centerY = (y + width) / 2;

					radius = (width * mass) / 2;

					let dx = neighbourCenterX - centerX;
					let dy = neighbourCenterY - centerY;

					distance = Math.sqrt(dx * dx + dy * dy);
				} while (distance < neighbourRadius + radius);

				points = [
					...points,
					{
						x,
						y,
						width,
						mass,
					},
				];

				j++;
			} while (pointsAmount < points.length);
		}
		return points;
	};

	/* Creating a div element and adding it to the page. */
	plotPoints = (points) => {
		this.x = points.x;
		this.y = points.y;

		this.mass = points.mass;
		this.width = `${points.width * this.mass}px`;

		let dot = document.createElement('div');

		dot.style.position = 'absolute';
		dot.style.top = `${this.x}px`;
		dot.style.left = `${this.y}px`;
		dot.style.width = this.width;
		dot.style.height = this.width;
		dot.style.backgroundColor = this.color;
		dot.style.borderRadius = '50%';
		dot.id = this.id;

		this.element.appendChild(dot);

		this.val = document.getElementById(this.id);
	};

	/* It adds a click event to the ball. */
	clickEventDelete = () => {
		this.val.addEventListener('click', this.deletePoint);
	};

	/* It adds a hover class to the ball. */
	addHover = () => {
		this.val.classList.add('hover');
	};

	/* It removes the ball from the screen and clears the interval. */
	deletePoint = () => {
		this.element.removeChild(this.val);
		this.clearAllInterval();
	};

	/* Returning the position of the ball. */
	ballPosition = () => {
		let width = parseInt(this.val.style.width);
		let height = parseInt(this.val.style.height);

		let x = parseInt(this.x);
		let y = parseInt(this.y);

		return {
			ballXMin: x,
			ballXMax: x + height,
			ballYMin: y,
			ballYMax: y + width,
		};
	};

	/* Reversing the direction of the ball. */
	reversePos = (toDo) => {
		if (toDo == 'x') {
			this.xAdd *= -1;
		} else {
			this.yAdd *= -1;
		}
	};

	/* A function that is used to make the balls bounce off the walls. */
	ballMovement = () => {
		let pos = this.ballPosition();
		this.ballXMin = pos.ballXMin;
		this.ballXMax = pos.ballXMax;
		this.ballYMin = pos.ballYMin;
		this.ballYMax = pos.ballYMax;

		/* Calculate the center of current ball */
		let radius = parseInt(this.width) / 2;
		let centerX = Math.round((this.ballXMax + this.ballXMin) / 2);
		let centerY = Math.round((this.ballYMax + this.ballYMin) / 2);

		/* Calculate the distance between the edges */
		let distancex1 = centerX - this.xMin;
		let distancex2 = this.xMax - centerX;
		let distancey3 = this.yMax - centerY;
		let distancey4 = centerY - this.yMin;

		/* Checking if ball is going off the edge */
		if (distancex1 < radius) {
			if (this.xAdd < 0) {
				this.xAdd *= -1;
			}
		}
		if (distancex2 < radius) {
			if (this.xAdd > 0) {
				this.xAdd *= -1;
			}
		}
		if (distancey3 < radius) {
			if (this.yAdd > 0) {
				this.yAdd *= -1;
			}
		}
		if (distancey4 < radius) {
			if (this.yAdd < 0) {
				this.yAdd *= -1;
			}
		}

		this.x += this.xAdd;
		this.val.style.top = `${this.x}px`;

		this.y += this.yAdd;
		this.val.style.left = `${this.y}px`;
	};

	/* A function that is used to make the balls bounce off the walls. */
	ballBounceWall = (xAdd, yAdd, speed) => {
		let value = getComputedStyle(document.querySelector(`#${this.elementId}`));

		this.xMin = 0;
		this.yMin = 0;
		this.yMax = parseInt(value.width);
		this.xMax = parseInt(value.height);

		/* Setting the frames per second to 60 and then it is calculating the time between each frame. */
		let fps = 60;
		this.frames = 1000 / fps;

		this.xAdd = xAdd * speed;
		this.yAdd = yAdd * speed;

		/* Setting the interval of the ballMovement function to the ballWallBounceInterval variable. */
		this.ballWallBounceInterval = setInterval(this.ballMovement, this.frames);
	};

	/* Detecting the collision between the balls. */
	ballCollision = (ballBounce) => {
		this.ballBounce = ballBounce;
		this.ballCollisionInterval = setInterval(this.ballDetect, this.frames);
	};

	/* The above code is detecting the collision between the balls. */
	ballDetect = () => {
		for (let i in this.ballBounce) {
			let neighbourElement = this.ballBounce[i];

			/* Checking if the id of the current element is greater than the id of the neighbour element. If it
			is, then it is checking if the two elements are colliding. */
			if (parseInt(neighbourElement.id) > parseInt(this.id)) {
				let pos = neighbourElement.ballPosition();
				let neighbourXMin = pos.ballXMin;
				let neighbourXMax = pos.ballXMax;
				let neighbourYMin = pos.ballYMin;
				let neighbourYMax = pos.ballYMax;

				/* Calculating the center of the ball and the radius of the ball. */
				let ballXCenter = Math.round(
					Math.abs(this.ballXMax + this.ballXMin) / 2
				);
				let ballYCenter = Math.round(
					Math.abs(this.ballYMax + this.ballYMin) / 2
				);

				let ballRadius = Math.round(parseInt(this.width) / 2);

				/* Calculating the center of the ball and the radius of the ball. */
				let neighbourXCenter = Math.round(
					Math.abs(neighbourXMax + neighbourXMin) / 2
				);
				let neighbourYCenter = Math.round(
					Math.abs(neighbourYMax + neighbourYMin) / 2
				);
				let neighbourRadius = Math.round(parseInt(neighbourElement.width) / 2);

				/* Calculating the distance between the two balls. */
				let dx = neighbourXCenter - ballXCenter;
				let dy = neighbourYCenter - ballYCenter;
				let distance = Math.sqrt(dx * dx + dy * dy);
				let radiusSum = ballRadius + neighbourRadius;

				/* Checking if the distance between the two elements is less than the sum of their radii. If it is,
				then it is swapping the x and y velocities of the two elements. Then it is checking if the x
				velocities are different. If they are, then it is swapping the x velocities again, but this time
				it is also adding the x velocities to the x positions of the two elements to calculate the momentum. Then it is doing the same thing for the y velocities. Then it is setting the top and left positions of the two	elements to their new x */
				if (distance < radiusSum) {
					[this.xAdd, neighbourElement.xAdd] = [
						neighbourElement.xAdd,
						this.xAdd,
					];
					[this.yAdd, neighbourElement.yAdd] = [
						neighbourElement.yAdd,
						this.yAdd,
					];

					if (this.xAdd != neighbourElement.xAdd) {
						[this.xAdd, neighbourElement.xAdd] = [
							(this.xAdd *
								neighbourElement.mass *
								parseInt(neighbourElement.width)) /
								(this.mass * parseInt(this.width)),

							(neighbourElement.xAdd * this.mass * parseInt(this.width)) /
								(neighbourElement.mass * parseInt(neighbourElement.width)),
						];

						this.x += this.xAdd * 5;
						neighbourElement.x += neighbourElement.xAdd * 5;
					}
					if (this.yAdd != neighbourElement.yAdd) {
						[this.yAdd, neighbourElement.yAdd] = [
							(this.yAdd *
								neighbourElement.mass *
								parseInt(neighbourElement.width)) /
								(this.mass * parseInt(this.width)),

							(neighbourElement.yAdd * this.mass * parseInt(this.width)) /
								(neighbourElement.mass * parseInt(neighbourElement.width)),
						];

						this.y += this.yAdd * 5;
						neighbourElement.y += neighbourElement.yAdd * 5;
					}

					this.val.style.top = `${this.x}px`;
					neighbourElement.val.style.top = `${neighbourElement.x}px`;

					this.val.style.left = `${this.y}px`;
					neighbourElement.val.style.left = `${neighbourElement.y}px`;
				}
			}
		}
	};

	/* It clears the interval of the ballCollisionInterval and ballWallBounceInterval. */
	clearAllInterval = () => {
		clearInterval(this.ballCollisionInterval);
		clearInterval(this.ballWallBounceInterval);
	};
}
/**
 * It returns a random integer between the two parameters, but if the random integer is 0, it returns 1
 * instead.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number of items to be returned.
 * @returns A random number between min and max.
 */
function getRndInteger(min, max) {
	let val = Math.floor(Math.random() * (max - min + 1)) + min;

	if (val == 0) {
		val++;
	}

	return val;
}

/**
 * It generates a random color code in hexadecimal format.
 * @returns A string of 6 characters, each of which is a hexadecimal digit.
 */
function getColorCode() {
	let colorRange = '0123456789ABCDEF';
	let colorCode = '#';

	for (let i = 0; i < 6; i++) {
		let index = Math.floor(Math.random() * colorRange.length);

		colorCode += colorRange[index];
	}
	return colorCode;
}

/**
 * If a random number is greater than 0.5, return 1, otherwise return -1.
 * @returns a random number between 1 and -1.
 */
function directionGive() {
	let direction = Math.random() > 0.5 ? 1 : -1;

	return direction;
}

/**
 * Return a random number between 1 and 3.
 * @returns A random number between 1 and 3.
 */
function randomSpeed() {
	return Math.floor(Math.random() * 3) + 1;
}

let points = [
	{
		x: 20,
		y: 20,
	},
	{
		x: 200,
		y: 500,
	},
	{
		x: 200,
		y: 800,
	},
];

let ballBounce = [];

/* Creating 10 balls and adding them to the page. */
window.onload = () => {
	let totalNumberOfBalls = 10;
	for (let i = 0; i < totalNumberOfBalls; i++) {
		ballBounce.push(new Objects('root', getColorCode(), `${i}-ball`));

		if (i == 0) {
			points = ballBounce[i].getPoints(totalNumberOfBalls);
		}

		ballBounce[i].plotPoints(points[i]);
		ballBounce[i].ballBounceWall(
			directionGive(),
			directionGive(),
			randomSpeed()
		);
		ballBounce[i].ballCollision(ballBounce);
	}
};

/**
 * It creates a bunch of balls that bounce around the screen and bounce off each other.
 * @param number - number of balls
 */
let getBalls = (number) => {
	let mainRoot = document.getElementById('root');
	mainRoot.innerHTML = '';
	for (let i in ballBounce) {
		ballBounce[i].clearAllInterval();
	}
	ballBounce = [];
	for (let i = 0; i < number; i++) {
		ballBounce.push(new Objects('root', getColorCode(), `${i}-ball`));

		if (i == 0) {
			points = ballBounce[i].getPoints(number);
		}

		ballBounce[i].plotPoints(points[i]);
		ballBounce[i].ballBounceWall(directionGive(), directionGive(), 1);
		ballBounce[i].ballCollision(ballBounce);
	}
};

/**
 * For each ballBounce object, add a hover event and a click event.
 */
let deleteOnClick = () => {
	for (let i in ballBounce) {
		ballBounce[i].addHover();
		ballBounce[i].clickEventDelete();
	}
};
