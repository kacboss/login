class Lazy {
	constructor() {
		this.instance = new LazyLoad({
			elements_selector: ".lazy:not(.loaded)",
			callback_loaded: image => {
				if (image.classList.contains("lazy--bg")) {
					setTimeout(() => {
						const src = image.currentSrc || image.src;
						const parent = image.parentNode;
						
						if (!parent.classList.contains("loaded")) {
							parent.classList.add("loaded");
							parent.style.backgroundImage = `url(${src})`;
						}
					}, 10);
				}
			}
		});
	}
	
	static reload() {
		this.instance && this.instance.update();
	};
}


export default new Lazy();