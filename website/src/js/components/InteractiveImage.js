import LocomotiveScroll from 'locomotive-scroll';
import debounce from '../utils/debounce';
import InfoBox from './InfoBox';

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

        // init all InfoBoxes to array in this.info
        this.info = [...document.getElementsByClassName('interactive-info')].reduce(
            (acc, currVal) => {
                acc.push(new InfoBox(currVal, this.lscroll));
                return acc;
            },
            []
        );

        // add event listener to update position when window is resized
        window.addEventListener('resize', debounce(this.updatePosition, 30));

        // set position on first load
        this.updatePosition();
    }

    // update position relative to image width
    updatePosition = () => {
        // get images' bounding rect
        const { height, width } = document
            .querySelector('.fullscreen-image__img')
            .getBoundingClientRect();

        // update each info box position
        this.info.forEach((infoBox) => {
            const newLeft = `${(infoBox.pos.x / 100) * width}px`;
            const newTop = `${(infoBox.pos.y / 100) * height}px`;

            infoBox.element.style.left = newLeft;
            infoBox.element.style.top = newTop;
        });
    };
}
