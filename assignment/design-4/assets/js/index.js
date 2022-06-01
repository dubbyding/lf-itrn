window.onload = () => {
	let v = document.getElementById('toggle-menu');
	let nav = document.getElementById('navi');
	v.onclick = () => {
		if (nav.style.display == 'block') {
			v.src = './assets/images/bars-solid.svg';
			nav.style.display = 'none';
		} else {
			v.src = './assets/images/x.png';
			nav.style.display = 'block';
		}
	};
};

window.onresize = () => {
	let nav = document.getElementById('navi');
	if (window.innerWidth > 1200) {
		nav.style.display = 'block';
	} else {
		nav.style.display = 'none';
	}
};
