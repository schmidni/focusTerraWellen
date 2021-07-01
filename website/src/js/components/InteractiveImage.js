import LocomotiveScroll from 'locomotive-scroll';
import debounce from '../utils/debounce';
import InteractiveInfo from './InteractiveInfo';

export default class InteractiveImage {
    constructor(scrollContainer) {
        this.titleSection = document.querySelector('.fullscreen-image__titlesection');
        this.fullscreenImage = document.querySelector('.fullscreen-image__img');
        this.titleVisible = true;

        // Initialize Locomotive Scroll (horizontal direction)
        this.lscroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            direction: 'horizontal',
            smartphone: { smooth: false, direction: 'vertical' },
            tablet: { smooth: false, direction: 'vertical' },
            resetNativeScroll: false,
        });

        // init all InteractiveInfo objects to array
        this.info = [...document.getElementsByClassName('interactive-info')].reduce(
            (acc, currVal) => {
                acc.push(new InteractiveInfo(currVal, this.lscroll));
                return acc;
            },
            []
        );

        // add event listener to update position when window is resized
        window.addEventListener('resize', debounce(this.updatePosition, 30));

        // set position on first load
        this.updatePosition();
        this.hideTitleOnScroll();
        this.hideTitleOnMobile();
    }

    // update position relative to image width
    updatePosition = () => {
        // get images bounding rect
        const { height, width } = this.fullscreenImage.getBoundingClientRect();

        // update each info box position
        this.info.forEach((infoElement) => {
            const newLeft = `${(infoElement.pos.x / 100) * width}px`;
            const newTop = `${(infoElement.pos.y / 100) * height}px`;

            infoElement.element.style.left = newLeft;
            infoElement.element.style.top = newTop;
        });
    };

    hideTitleOnScroll = () => {
        // hide title section on first scroll event
        this.lscroll.on('scroll', ({ scroll }) => {
            if (scroll.x < 100 && !this.titleVisible) {
                this.titleSection.classList.remove('hidden');
                this.titleVisible = true;
            } else if (scroll.x >= 100 && this.titleVisible) {
                this.titleSection.classList.add('hidden');
                this.titleVisible = false;
            }
        });
    };

    hideTitleOnMobile = () => {
        document.ontouchend = () => {
            if (this.titleVisible) {
                this.titleSection.classList.add('hidden');
                this.titleVisible = false;
            }
            console.log(this.fullscreenImage.getBoundingClientRect());
        };
    };
}
