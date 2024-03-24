class Animations {
	constructor() {

        window.slideUp = (target, duration = 600, parent_or_link) => {
            if ( parent_or_link ){
                parent_or_link.classList.remove('is_active_start');
            }
            target.classList.remove('animation_end');
            target.classList.add('animation_start');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;

            window.setTimeout( () => {
                target.style.display = 'none';
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('animation_start');
                target.classList.add('animation_end');
                if ( parent_or_link ){
                    parent_or_link.classList.remove('is_active_end');
                }
            }, duration);
        }

        window.slideDown = (target, duration = 800, parent_or_link) => {
            if ( parent_or_link ){
                parent_or_link.classList.add('is_active_start');
            }
            target.classList.remove('animation_end');
            target.classList.add('animation_start');
            target.style.removeProperty('display');
            let display = window.getComputedStyle(target).display;

            if (display === 'none')
            display = 'block';

            target.style.display = display;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');

            window.setTimeout( () => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('animation_start');
                target.classList.add('animation_end');
                if ( parent_or_link ){
                    parent_or_link.classList.add('is_active_end');
                }
            }, duration);
        }

        window.slideToggle = (target, duration = 800, parent_or_link) => {
            if (window.getComputedStyle(target).display === 'none') {
                return slideDown(target, duration, parent_or_link);
            } else {
                return slideUp(target, duration, parent_or_link);
            }
        }


	}
}

export default new Animations();
