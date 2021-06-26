import LocomotiveScroll from 'locomotive-scroll';
import closePopupElement from '../utils/closePopupElement';

export default class InteractiveImage {
    constructor(scrollContainer) {
        // Initialize Locomotive Scroll (horizontal direction)
        this.lscroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            direction: 'horizontal',
            smartphone: { smooth: false, direction: 'vertical' },
            tablet: { smooth: false, direction: 'vertical' },
        });

        document.getElementById('pointer-1').addEventListener('click', (e) => {
            const closeIcon = document.getElementById('close-icon-1');
            const popupElement = document.getElementById('text-1');
            const activeClass = 'text-active';
            e.stopImmediatePropagation();

            popupElement.classList.toggle(activeClass);

            closePopupElement(popupElement, closeIcon, activeClass);
        });

        const mc = document.querySelector('.interactive-info__text');
        mc.onmouseover = () => {
            this.lscroll.stop();
        };
        mc.onmouseout = () => this.lscroll.start();
    }

    toggleDisplay = (el) => {
        el.classList.toggle('text-active');
    };
}
