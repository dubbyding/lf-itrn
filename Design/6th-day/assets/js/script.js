window.onload = () => {
	let v = document.getElementById('toggle-nav');
	let block = document.getElementById('navs');

	v.onclick = () => {
		block.classList.toggle('display-none');
	};
};
