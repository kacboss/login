import InView from 'InView';

class AnimationsOnScroll {
    constructor(e) {

        var inview = InView(e, function(isInView, data) {

            var e_animation     = e.getAttribute('data-fx'),
                e_offset        = e.getAttribute('data-fx-offset') ? e.getAttribute('data-fx-offset') : '0%',
                e_offset_value  = parseFloat(e_offset.replace(/-[^0-9.,]/g, '')),
                e_offset_px     = (data.inViewHeight / 100) * e_offset_value,
                e_delay         = e.getAttribute('data-fx-delay') ? parseFloat(e.getAttribute('data-fx-delay')) : 0,
                e_duration      = e.getAttribute('data-fx-duration') ? parseFloat(e.getAttribute('data-fx-duration')) : 800,
                v_offset        = data.inViewHeight + (~e_offset_px);

            var getElementPosition = (element) => {
                var box        = element.getBoundingClientRect(),
                    body       = document.body,
                    docEl      = document.documentElement,
                    scrollTop  = window.pageYOffset || docEl.scrollTop || body.scrollTop,
                    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
                    clientTop  = docEl.clientTop || body.clientTop || 0,
                    clientLeft = docEl.clientLeft || body.clientLeft || 0,
                    top        = box.top +  scrollTop - clientTop,
                    left       = box.left + scrollLeft - clientLeft;

                return {
                    top: Math.round(top),
                    left: Math.round(left)
                };
            }

            if  (
                    !e.classList.contains('fx_start') &&
                    !e.classList.contains('fx_progress') &&
                    !e.classList.contains('fx_done')
                ) {

                var v_offset          = getElementPosition(e),
                    v_offset_top      = v_offset.top,
                    v_offset_top_calc = v_offset_top - data.inViewHeight + e_offset_px;


                if( data.windowScrollTop >= v_offset_top_calc ) {
                    e.style.WebkitAnimationDuration = `${e_duration}ms`;
                    e.style.animationDuration = `${e_duration}ms`;
                    e.classList.add('fx_start');

                    setTimeout( () => {
                        e.classList.add('fx_progress');
                    }, e_delay );

                    setTimeout( () => {
                        e.classList.add('fx_done');
                    }, e_delay + e_duration );
                }
            }

        });
    }

    static init() {
        let items = document.querySelectorAll('[data-fx]');
        items.forEach(item => {
            new AnimationsOnScroll(item)
        })
    }

}

export default AnimationsOnScroll
