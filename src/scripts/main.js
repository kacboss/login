import  gsap  from 'gsap';
import ScrollTrigger  from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import AnimationsOnScroll from "./AnimationsOnScroll";
import Animations from "./Animations";


const app = {

	book: () => {
		let btns = document.querySelectorAll('.book-btn');
		let form = document.querySelector('.book');
		let exit = document.querySelector('.exit');
		let exit_mobile = document.querySelector('.exit-mobile');
		let msg         	= document.querySelector('.cf-message');

		let body = document.body;


		if (btns) {
            btns.forEach(btn => {
                btn.addEventListener('click', function(event) {
                    // Prevent default button click behavior
                    event.preventDefault();
                    // Add 'active' class to the form when any 'book-btn' is clicked
                    form.classList.add('active');
					body.classList.add('body-no-scroll');

                });
            });
			exit.addEventListener('click', function() {
                // Remove 'active' class from the form when 'exit' is clicked
                form.classList.remove('active');
				body.classList.remove('body-no-scroll');
				msg.innerHTML = "";
            });

			exit_mobile.addEventListener('click', function() {
                // Remove 'active' class from the form when 'exit' is clicked
                form.classList.remove('active');
				body.classList.remove('body-no-scroll');
				msg.innerHTML = "";
            });

		}

	},

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
         	classTo: 'input-wrapper',
         	errorClass: 'input-wrapper--error',
         	successClass: 'input-wrapper--success',
      	};

      	return config;

	},

	contactForm: () => {

		let config 		= app.getValidationConfig();
		let forms 		= document.querySelectorAll('.book__box');
	
		if ( forms ) {
	
		  [].forEach.call(forms, form => {

			let contactForm 	= form.querySelector('.contact-form');
			let submitBtn   	= form.querySelector('.btn');
			let formValidator 	= new Pristine(contactForm, config, true);
			let msg         	= form.querySelector('.cf-message');

	
			  submitBtn.addEventListener('click', (e) => {
				e.preventDefault();
				
				if ( formValidator.validate()  ) {
		
				
				var formData = new FormData(contactForm);
	
				formData.append('action', contactForm.getAttribute('data-action'));
	
				let request = ajax({
				  method: 'POST',
				  headers: {
					  'content-type': false
				  },
				  url: wpp.ajax,
				  data: formData
				})
				request.then(function(response) {
					msg.textContent = response.msg;
					let inputFields = contactForm.querySelectorAll('input, textarea');
					[].forEach.call(inputFields, field => {
						field.value = '';
					});
				});
			   }
	
			  }, false);
	
			});
		  }
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
				  end: "+=600px", // Animation ends when the bottom of trigger hits the top of viewport
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



	customers: () => {
		let section = document.querySelector('.customers-baner__swiper');

		if (section) {

			var swiper1 = new Swiper('.customers-baner__swiper', {
				slidesPerView: 6,
				watchSlidesProgress: true,
				spaceBetween: 24,

				preventInteractionOnTransition: true,

				  breakpoints: {
					// when window width is >= 320px
					120: {
					  slidesPerView: 3,
					  spaceBetween: 20
					},
					640: {
					  slidesPerView: 3,
					  spaceBetween: 24
					},
					1046: {
						slidesPerView: 6,
						spaceBetween: 24
					  }
				  }

			});
	

		}	

	},

	reviews: () => {
		let section = document.querySelector('.reviews');

		if (section) {

			var swiper1 = new Swiper('.reviews1', {
				slidesPerView: 1,
				watchSlidesProgress: true,
				spaceBetween: 24,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				  },
				  preventInteractionOnTransition: true,

				  breakpoints: {
					// when window width is >= 320px
					120: {
					  slidesPerView: 1.1,
					  spaceBetween: 20
					},
					640: {
					  slidesPerView: 2,
					  spaceBetween: 40
					},
					1046: {
						slidesPerView: 3,
						spaceBetween: 40
					  }
				  }

			});
		
			var swiper2 = new Swiper('.reviews2', {
				slidesPerView: 1,
				watchSlidesProgress: true,
				spaceBetween: 24,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				  },
				preventInteractionOnTransition: true,
				breakpoints: {
					// when window width is >= 320px
					120: {
					  slidesPerView: 1.1,
					  spaceBetween: 20
					},
					640: {
					  slidesPerView: 2,
					  spaceBetween: 40
					},
					1046: {
						slidesPerView: 4,
						spaceBetween: 40
					  }
				  }

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

	showMobileMenu: () => {

		let mobileMenu = document.querySelector('.mobile-menu');
		let hamburger = document.querySelector('#opener');


		if (hamburger) {

				hamburger.addEventListener('click', () => {
					mobileMenu.classList.toggle('active');
					hamburger.classList.toggle('active');
					document.body.classList.toggle('body-no-scroll');
				});


			}
	},

	isScrolled: function() {

		let scrolled = window.scrollY || document.documentElement.scrollTop,
				body = document.querySelector('body');

		if (scrolled > 30 ) {
				body.setAttribute('data-scrolled','true');
		} else {
				body.setAttribute('data-scrolled','false');
		}
	},
	


	onResize: () => {
	},
	
	onScroll: () => {
		app.isScrolled();
	},
	
	init: () => {
		app.contactForm();
		AnimationsOnScroll.init();
		app.reviews();
		app.body();
		app.secAnimation();
		app.showMobileMenu();
		app.book();
		app.customers();

	}
};

document.addEventListener("DOMContentLoaded", () => {
	app.init();
	window.addEventListener("resize", app.onResize);
	window.addEventListener("scroll", app.onScroll);
	window.dispatchEvent(new Event("resize"));
	window.dispatchEvent(new Event("scroll"));
});
