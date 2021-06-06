import 'whatwg-fetch';
import LocomotiveScroll from 'locomotive-scroll';

export default class App {
    constructor(scrollContainer) {
        // Initialize Locomotive Scroll (horizontal direction)
        this.lscroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            direction: 'horizontal',
            smartphone: { smooth: false, direction: 'vertical' },
            tablet: { smooth: false, direction: 'vertical' },
        });

        document.getElementById('pointer-1').addEventListener('click', (event) => {
            this.toggleDisplay(document.getElementById('text-1'));
        });
    }

    toggleDisplay = (el) => {
        if (el.style.display === 'none') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    };
}
