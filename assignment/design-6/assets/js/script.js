window.onload = () => {
	let v = document.getElementById('navs');
	let toggle = document.getElementById('toggle');
	let count = 0;
	toggle.onclick = () => {
		v.classList.toggle('hidden');
		if (count == 0) {
			toggle.src = './assets/image/cross.svg';
			count++;
		} else {
			toggle.src = './assets/image/ham.svg';
			count--;
		}
	};
};
