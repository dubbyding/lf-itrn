window.onload = () => {
	let v = document.getElementById('toggle-menu');
	let nav = document.getElementById('navi');
	v.onclick = () => {
		if (nav.style.display == 'block') {
			nav.style.display = 'none';
		} else {
			nav.style.display = 'block';
		}
	};
};

window.onresize = () => {
	let nav = document.getElementById('navi');
	if (window.innerWidth > 576) {
		nav.style.display = 'block';
	} else {
		nav.style.display = 'none';
	}
};
