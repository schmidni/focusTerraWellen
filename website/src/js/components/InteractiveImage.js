import LocomotiveScroll from 'locomotive-scroll';
import debounce from '../utils/debounce';
import InteractiveInfo from './InteractiveInfo';

export default class InteractiveImage {
    constructor(scrollContainer) {
        // Initialize Locomotive Scroll (horizontal direction)
        this.lscroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            direction: 'horizontal',
            smartphone: { smooth: true, direction: 'vertical' },
            tablet: { smooth: true, direction: 'vertical' },
        });

        // init all InteractiveInfo objects to array
        this.info = [...document.getElementsByClassName('interactive-info')].reduce(
            (acc, currVal) => {
                acc.push(new InteractiveInfo(currVal, this.lscroll));
                return acc;
            },
            []
        );

        // hide title section on first scroll event
        this.titlesection = document.querySelector('.fullscreen-image__titlesection');
        this.titleVisible = true;
        // this.lscroll.on('scroll', () => {
        //     if (this.titleVisible) {
        //         this.titlesection.classList.add('hidden');
        //         this.titleVisible = false;
        //     }
        // });

        // add event listener to update position when window is resized
        window.addEventListener('resize', debounce(this.updatePosition, 30));

        // set position on first load
        this.updatePosition();
    }

    // update position relative to image width
    updatePosition = () => {
        // get images bounding rect
        const { height, width } = document
            .querySelector('.fullscreen-image__img')
            .getBoundingClientRect();

        // update each info box position
        this.info.forEach((infoElement) => {
            const newLeft = `${(infoElement.pos.x / 100) * width}px`;
            const newTop = `${(infoElement.pos.y / 100) * height}px`;

            infoElement.element.style.left = newLeft;
            infoElement.element.style.top = newTop;
        });
    };
}
