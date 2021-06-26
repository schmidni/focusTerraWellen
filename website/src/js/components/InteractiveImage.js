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

        // init and save all InfoBoxes
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
        const { height, width } = document
            .querySelector('.fullscreen-image__img')
            .getBoundingClientRect();

        this.info.forEach((infoBox) => {
            const newWidth = `${(infoBox.element.dataset.posx / 100) * width}px`;
            const newHeight = `${(infoBox.element.dataset.posy / 100) * height}px`;

            infoBox.element.style.left = newWidth;
            infoBox.element.style.top = newHeight;
        });
    };
}
