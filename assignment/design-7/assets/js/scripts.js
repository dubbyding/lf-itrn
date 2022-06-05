window.onload = () => {
	let toggle = document.getElementById('toggle');
	let nav = document.getElementById('nav');
	toggle.onclick = () => {
		nav.classList.toggle('hidden');
	};
};
