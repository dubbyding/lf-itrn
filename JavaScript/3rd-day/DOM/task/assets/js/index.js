class Objects {
	constructor(elementId, points, width, height, color, id, mass) {
		this.elementId = elementId;
		this.element = document.getElementById(this.elementId);
		this.x = points.x;
		this.y = points.y;
		this.mass = mass;
		this.width = `${width * this.mass}px`;
		this.height = `${height * this.mass}px`;
		this.color = color;
		this.id = id;
	}
	plotPoints = () => {
		let dot = document.createElement('div');

		dot.style.position = 'absolute';
		dot.style.top = `${this.x}px`;
		dot.style.left = `${this.y}px`;
		dot.style.width = this.width;
		dot.style.height = this.height;
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

		if (this.xAdd == 0) {
			this.xAdd++;
		}
		if (this.yAdd == 0) {
			this.yAdd++;
		}

		if (this.ballXMin > this.xMin && this.ballXMax < this.xMax) {
			this.x += this.xAdd;
			this.val.style.top = `${this.x}px`;
		} else {
			this.reversePos('x');
			this.x += this.xAdd * 2;
			this.val.style.top = `${this.x}px`;
		}
		if (this.ballYMin > this.yMin && this.ballYMax < this.yMax) {
			this.y += this.yAdd;
			this.val.style.left = `${this.y}px`;
		} else {
			this.reversePos('y');
			this.y += this.yAdd * 2;
			this.val.style.left = `${this.y}px`;
		}
	};
	ballBounce = (xAdd, yAdd, speed) => {
		let value = getComputedStyle(document.querySelector(`#${this.elementId}`));

		this.xMin = 0;
		this.yMin = 0;
		this.yMax = parseInt(value.width);
		this.xMax = parseInt(value.height);

		let fps = 60;
		this.frames = 1000 / fps;

		this.xAdd = xAdd * speed;
		this.yAdd = yAdd * speed;

		setInterval(this.ballMovement, this.frames);
	};
	ballCollision = (ballBounce) => {
		this.ballBounce = ballBounce;
		setInterval(this.ballDetect, this.frames);
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
				if (
					this.ballXMin < neighbourXMax &&
					this.ballXMax > neighbourXMin &&
					this.ballYMin < neighbourYMax &&
					this.ballYMax > neighbourYMin
				) {
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
							(this.xAdd * neighbourElement.mass) / this.mass,

							(neighbourElement.xAdd * this.mass) / neighbourElement.mass,
						];

						this.x += this.xAdd * 4;
						neighbourElement.x += neighbourElement.xAdd * 4;
					}
					if (this.yAdd != neighbourElement.yAdd) {
						[this.yAdd, neighbourElement.yAdd] = [
							(this.yAdd * neighbourElement.mass) / this.mass,

							(neighbourElement.yAdd * this.mass) / neighbourElement.mass,
						];

						this.y += this.yAdd * 4;
						neighbourElement.y += neighbourElement.yAdd * 4;
					}

					this.val.style.top = `${this.x}px`;
					neighbourElement.val.style.top = `${neighbourElement.x}px`;

					this.val.style.left = `${this.y}px`;
					neighbourElement.val.style.left = `${neighbourElement.y}px`;
				}
			}
		}
	};
}
function getRndInteger(min, max) {
	let val = Math.floor(Math.random() * (max - min + 1)) + min;
	if (val == 0) {
		val++;
	}
	return val;
}
var points = [
	{ x: 10, y: 20 },
	{ x: 10, y: 400 },
	{ x: 60, y: 20 },
	{ x: 100, y: 200 },
	{ x: 100, y: 400 },
];
let nodes = [];
for (let i in points) {
	nodes[i] = new Objects('root', points[i], 20, 20, 'red', `${i}-point`, 1);
	nodes[i].plotPoints();
	nodes[i].addHover();
}
let ballBounce = [];
for (let i in points) {
	ballBounce[i] = new Objects(
		'ballBounceContainer',
		points[i],
		20,
		20,
		'red',
		`${i}-ball`,
		getRndInteger(1, 2) / 2
	);
	ballBounce[i].plotPoints();
	ballBounce[i].ballBounce(getRndInteger(-1, 1), getRndInteger(-1, 1), 1);

	ballBounce[i].ballCollision(ballBounce);
}
