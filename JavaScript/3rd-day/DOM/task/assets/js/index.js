class Objects {
	constructor(elementId, points, width, height, color, id) {
		this.elementId = elementId;
		this.element = document.getElementById(this.elementId);
		this.x = points.x;
		this.y = points.y;
		this.width = width;
		this.height = height;
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

		if (this.ballXMin > this.xMin && this.ballXMax < this.xMax) {
			this.x += this.xAdd;
			this.val.style.top = `${this.x}px`;
		} else {
			this.reversePos('x');
			this.x += this.xAdd;
			this.val.style.top = `${this.x}px`;
		}
		if (this.ballYMin > this.yMin && this.ballYMax < this.yMax) {
			this.y += this.yAdd;
			this.val.style.left = `${this.y}px`;
		} else {
			this.reversePos('y');
			this.y += this.yAdd;
			this.val.style.left = `${this.y}px`;
		}
	};
	ballBounce = () => {
		let value = getComputedStyle(document.querySelector(`#${this.elementId}`));

		this.xMin = 0;
		this.yMin = 0;
		this.yMax = parseInt(value.width);
		this.xMax = parseInt(value.height);

		let fps = 60;
		this.frames = 1000 / fps;

		this.xAdd = 1;
		this.yAdd = 1;

		setInterval(this.ballMovement, this.frames);
	};
	ballCollision = (ballBounce) => {
		this.ballBounce = ballBounce;
		this.Checker = true;
		setInterval(this.ballDetect, this.frames);
	};
	ballDetect = () => {
		for (let i in this.ballBounce) {
			let neighbourElement = this.ballBounce[i];
			if (neighbourElement.id != this.val.id) {
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
					if (this.Checker || neighbourElement.Checker) {
						let xMaxDiff = this.ballXMax - neighbourXMax;
						let yMaxDiff = this.ballYMax - neighbourYMax;
						if (xMaxDiff < 0) {
							this.reversePos('x');
						} else if (xMaxDiff > 0) {
							neighbourElement.reversePos('x');
						} else {
							this.reversePos('x');
							neighbourElement.reversePos('x');
						}
						if (yMaxDiff > 0) {
							this.reversePos('y');
						} else if (yMaxDiff < 0) {
							neighbourElement.reversePos('y');
						} else {
							this.reversePos('y');
							neighbourElement.reversePos('y');
						}

						this.Checker = false;
						neighbourElement.Checker = false;
					}
				} else {
					this.Checker = true;
					neighbourElement.Checker = true;
				}
			}
		}
	};
}
var points = [
	{ x: 10, y: 20 },
	{ x: 40, y: 40 },
	{ x: 60, y: 20 },
];
let nodes = [];
for (let i in points) {
	nodes[i] = new Objects(
		'root',
		points[i],
		'20px',
		'20px',
		'red',
		`${i}-point`
	);
	nodes[i].plotPoints();
	nodes[i].addHover();
}
let ballBounce = [];
for (let i in points) {
	ballBounce[i] = new Objects(
		'ballBounceContainer',
		points[i],
		'20px',
		'20px',
		'red',
		`${i}-ball`
	);
	ballBounce[i].plotPoints();
	ballBounce[i].ballBounce();

	ballBounce[i].ballCollision(ballBounce);
}
