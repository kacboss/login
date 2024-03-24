import  gsap  from 'gsap';
import ScrollTrigger  from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import AnimationsOnScroll from "./AnimationsOnScroll";
import Animations from "./Animations";
import InView from 'InView';

const app = {
	getValidationConfig: () => {

		Pristine.addValidator(
		    'equals',
		    function (val, otherFieldSelector) {
		        var other = document.querySelector(otherFieldSelector);
		        return other && ((!val && !other.value) || other.value === val);
		    },
		    'Fields do not match',
		    1,
		    true
		);

		let config = {
         	classTo: 'form__input__group',
         	errorClass: 'form__input__group--error',
         	successClass: 'form__input__group--success',
      	};

      	return config;

	},


	secAnimation: () => {
		let section = document.querySelector('.login__header');
		console.log("scrollTrigger", ScrollTrigger);
	  
		if (section) {
		  // Set the initial state with GSAP
		  gsap.set(section, {width: "90%", margin: "0 auto",background: "#243837", borderRadius: "20px"});
	  
		  // Animate from 80% to 100% width
		  gsap.to(section, {
			width: "100%", // Target width
			ease: "none",
			background: "#1c2e2d",
			borderRadius: "0px", // Docelowy border-radius
			scrollTrigger: {
			  trigger: section,
			  start: "top center", // Animation starts when the top of trigger hits the bottom of viewport
			  end: "bottom center", // Animation ends when the bottom of trigger hits the top of viewport
			  scrub: true, // Smooth scrubbing
			  // markers: true, // Uncomment this line to see start/end markers
			}
		  });

		}

		let sectionBody = document.querySelector('.login__body');
		let footer = document.querySelector('.footer');
		



		if (sectionBody) {

			gsap.set(sectionBody, { width: "100%",margin: "0 auto", opacity: 0.7, maxHeight: "0px", overflow: "hidden", translateY: 0, translateX: 70  });


			gsap.to(sectionBody, {
				opacity: 1,
				translateY: 0,
				translateX: 0,
				maxHeight: "1200px", 
				width: "100%", // Target width
				ease: "power1.out",
				scrollTrigger: {
				  trigger: section,
				  start: "bottom bottom-=20%", // Animation starts when the top of trigger hits the bottom of viewport
				  end: "+=400px", // Animation ends when the bottom of trigger hits the top of viewport
				  scrub: true, // Smooth scrubbing
				  markers: true, // Uncomment this line to see start/end markers
				}
			  });


			  let loginSign = section.querySelector('.login__sign');

			  // Ustawienie stanu początkowego dla .login__sign
			
			  // Animacja od 80% do 100% szerokości dla .login__sign
			  gsap.to(loginSign, {
				width: "100%", // Docelowa szerokość
				ease: "none",
				scrollTrigger: {
				  trigger: section, // Użyj tego samego triggera co dla sekcji
				  start: "top center", // Te same punkty startu
				  end: "bottom center", // i końca
				  scrub: true, // Płynna zmiana wraz z przewijaniem
				  // markers: true, // Odkomentuj, aby zobaczyć markery
				}
			  });

		  } 
	},

	reviews: () => {
		let section = document.querySelector('.reviews');

		if (section) {

			var swiper1 = new Swiper('.reviews1', {
				slidesPerView: 3,
				watchSlidesProgress: true,
				spaceBetween: 24,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				  },
				  preventInteractionOnTransition: true,

			});
		
			var swiper2 = new Swiper('.reviews2', {
				slidesPerView: 4,
				watchSlidesProgress: true,
				spaceBetween: 24,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				  },
				  preventInteractionOnTransition: true,

			});
		

		}	

	},



	body: () => {
		/*
		let sectionBody = document.querySelector('.login__body');
  
		// Ustawienie stanu początkowego z GSAP
		gsap.set(sectionBody, { width: "80%",margin: "0 auto", opacity: 0, maxHeight: "0px", overflow: "hidden", translateY: -200, translateX: 100  });
	  
		// Funkcja callback, która wywoła animację GSAP
		let animateSectionBody = (entries, observer) => {
		  entries.forEach(entry => {
			if (entry.isIntersecting) {
			  // Rozpocznij animację GSAP
			  gsap.to(sectionBody, {
				opacity: 1,
				width: "100%",
				translateY: 0,
				translateX: 0,
				maxHeight: "1200px", // Dostosuj, jeśli potrzebujesz
				ease: "power1.out",
				duration: 1.5 // Dostosuj czas trwania animacji
			  });
	  
			  // Po uruchomieniu animacji, możemy wyłączyć observer
			  observer.unobserve(entry.target);
			}
		  });
		};
	  
		// Ustawienia dla obserwatora przecięcia
		let options = {
		  root: null, // domyślnie viewport
		  threshold: 0.85, // uruchom, gdy 50% elementu jest widoczne
		};
	  
		// Tworzenie obserwatora przecięcia
		let observer = new IntersectionObserver(animateSectionBody, options);
	  
		// Obserwowanie konkretnego elementu
		observer.observe(document.querySelector('.login'));
		*/
	},
	


	onResize: () => {
	},
	
	onScroll: () => {
	},
	
	init: () => {
		AnimationsOnScroll.init();
		app.reviews();
		app.body();
		app.secAnimation();

	}
};

document.addEventListener("DOMContentLoaded", () => {
	app.init();
	window.addEventListener("resize", app.onResize);
	window.addEventListener("scroll", app.onScroll);
	window.dispatchEvent(new Event("resize"));
	window.dispatchEvent(new Event("scroll"));
});
