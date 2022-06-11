class Objects {
	constructor(elementId, color, id) {
		this.elementId = elementId;
		this.element = document.getElementById(this.elementId);
		this.color = color;
		this.id = id;
	}
	getPoints = (pointsAmount) => {
		let points = [];
		let x, y, width, mass;

		for (let i = 0; i < pointsAmount; i++) {
			let j = 0;
			do {
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

				let neighbourCenterX = (neighbourX + neighbourWidth) / 2;
				let neighbourCenterY = (neighbourY + neighbourWidth) / 2;

				let neighbourRadius = (neighbourMass * neighbourWidth) / 2;
				do {
					x = getRndInteger(20, window.innerHeight - 50);
					y = getRndInteger(20, window.innerWidth - 50);
					width = getRndInteger(10, 20);
					mass = getRndInteger(1, 2);

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
		this.val.addEventListener('click', this.deletePoint);
	};
	addHover = () => {
		this.val.classList.add('hover');
	};
	deletePoint = () => {
		this.element.removeChild(this.val);
	};
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
	reversePos = (toDo) => {
		if (toDo == 'x') {
			this.xAdd *= -1;
		} else {
			this.yAdd *= -1;
		}
	};
	ballMovement = () => {
		let pos = this.ballPosition();
		this.ballXMin = pos.ballXMin;
		this.ballXMax = pos.ballXMax;
		this.ballYMin = pos.ballYMin;
		this.ballYMax = pos.ballYMax;
		let radius = parseInt(this.width) / 2;
		let centerX = Math.round((this.ballXMax + this.ballXMin) / 2);
		let centerY = Math.round((this.ballYMax + this.ballYMin) / 2);
		let dx1 = centerX - this.xMin;
		let dx2 = this.xMax - centerX;
		let dy3 = this.yMax - centerY;
		let dy4 = centerY - this.yMin;

		if (dx1 < radius) {
			if (this.xAdd < 0) {
				this.xAdd *= -1;
			}
		}
		if (dx2 < radius) {
			if (this.xAdd > 0) {
				this.xAdd *= -1;
			}
		}
		if (dy3 < radius) {
			if (this.yAdd > 0) {
				this.yAdd *= -1;
			}
		}
		if (dy4 < radius) {
			if (this.yAdd < 0) {
				this.yAdd *= -1;
			}
		}

		this.x += this.xAdd;
		this.val.style.top = `${this.x}px`;

		this.y += this.yAdd;
		this.val.style.left = `${this.y}px`;
	};
	ballBounceWall = (xAdd, yAdd, speed) => {
		let value = getComputedStyle(document.querySelector(`#${this.elementId}`));

		this.xMin = 0;
		this.yMin = 0;
		this.yMax = parseInt(value.width);
		this.xMax = parseInt(value.height);

		let fps = 60;
		this.frames = 1000 / fps;

		this.xAdd = xAdd * speed;
		this.yAdd = yAdd * speed;

		this.ballWallBounceInterval = setInterval(this.ballMovement, this.frames);
	};
	ballCollision = (ballBounce) => {
		this.ballBounce = ballBounce;
		this.ballCollisionInterval = setInterval(this.ballDetect, this.frames);
	};
	ballDetect = () => {
		for (let i in this.ballBounce) {
			let neighbourElement = this.ballBounce[i];
			if (parseInt(neighbourElement.id) > parseInt(this.id)) {
				let pos = neighbourElement.ballPosition();
				let neighbourXMin = pos.ballXMin;
				let neighbourXMax = pos.ballXMax;
				let neighbourYMin = pos.ballYMin;
				let neighbourYMax = pos.ballYMax;

				let ballXCenter = Math.round(
					Math.abs(this.ballXMax + this.ballXMin) / 2
				);
				let ballYCenter = Math.round(
					Math.abs(this.ballYMax + this.ballYMin) / 2
				);

				let ballRadius = Math.round(parseInt(this.width) / 2);

				let neighbourXCenter = Math.round(
					Math.abs(neighbourXMax + neighbourXMin) / 2
				);
				let neighbourYCenter = Math.round(
					Math.abs(neighbourYMax + neighbourYMin) / 2
				);
				let neighbourRadius = Math.round(parseInt(neighbourElement.width) / 2);

				let dx = neighbourXCenter - ballXCenter;
				let dy = neighbourYCenter - ballYCenter;
				let distance = Math.sqrt(dx * dx + dy * dy);
				let radiusSum = ballRadius + neighbourRadius;

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
	clearAllInterval = () => {
		clearInterval(this.ballCollisionInterval);
		clearInterval(this.ballWallBounceInterval);
	};
}
function getRndInteger(min, max) {
	let val = Math.floor(Math.random() * (max - min + 1)) + min;
	if (val == 0) {
		val++;
	}
	return val;
}
function getColorCode() {
	let colorRange = '0123456789ABCDEF';
	let colorCode = '#';
	for (let i = 0; i < 6; i++) {
		let index = Math.floor(Math.random() * colorRange.length);
		colorCode += colorRange[index];
	}
	return colorCode;
}
function directionGive() {
	let direction = Math.random() > 0.5 ? 1 : -1;
	return direction;
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
window.onload = () => {
	let totalNumberOfBalls = 10;
	for (let i = 0; i < totalNumberOfBalls; i++) {
		ballBounce.push(new Objects('root', getColorCode(), `${i}-ball`));
		if (i == 0) {
			points = ballBounce[i].getPoints(totalNumberOfBalls);
		}
		ballBounce[i].plotPoints(points[i]);
		ballBounce[i].ballBounceWall(directionGive(), directionGive(), 1);
		ballBounce[i].ballCollision(ballBounce);
	}
};
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
