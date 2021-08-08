import LocomotiveScroll from 'locomotive-scroll';
import debounce from '../utils/debounce';
import InteractiveInfo from './InteractiveInfo';

export default class InteractiveImage {
    constructor(scrollContainer) {
        this.titleSection = document.querySelector('.fullscreen-image__titlesection');
        this.weitergedacht = document.querySelector('.fullscreen-image__weitergedacht');
        this.fullscreenImage = document.querySelector('.fullscreen-image__img');
        this.titleVisible = true;
        this.weitergedachtVisible = false;
        this.mobileLocomotive = {};

        // small hack to use locomotive on desktop screens < 1024
        if (window.matchMedia('not all and (hover: hover), not all and (pointer: fine)').matches) {
            this.mobileLocomotive = {
                smartphone: { smooth: false, direction: 'vertical' },
                tablet: { smooth: false, direction: 'vertical' },
            };
        } else {
            this.mobileLocomotive = {
                tablet: { breakpoint: 0 },
            };
        }

        // Initialize Locomotive Scroll (horizontal direction)
        this.lscroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            direction: 'horizontal',
            resetNativeScroll: false,
            ...this.mobileLocomotive,
        });

        // init all InteractiveInfo objects to array
        this.info = [...document.getElementsByClassName('interactive-info')].reduce(
            (acc, currVal) => {
                acc.push(new InteractiveInfo(currVal, this.lscroll));
                return acc;
            },
            []
        );

        this.annotations = [...document.getElementsByClassName('annotations__element')];
        this.annotations.forEach((annot) => {
            annot.style.transform = `rotate(${annot.dataset.rot}deg)`;
        });

        // add event listener to update position when window is resized
        window.addEventListener('resize', debounce(this.updatePosition, 100));

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

        // update each annotation position
        this.annotations.forEach((annot) => {
            annot.style.left = `${(annot.dataset.posx / 100) * width}px`;
            annot.style.top = `${(annot.dataset.posy / 100) * height}px`;
        });

        const weiterLeft = `${width - this.weitergedacht.getBoundingClientRect().width}px`;
        this.weitergedacht.style.left = weiterLeft;
    };

    hideTitleOnScroll = () => {
        // hide title section on scroll event
        this.lscroll.on('scroll', ({ scroll, limit }) => {
            if (scroll.x < 100 && !this.titleVisible) {
                this.titleSection.classList.remove('hidden');
                this.titleVisible = true;
            } else if (scroll.x >= 100 && this.titleVisible) {
                this.titleSection.classList.add('hidden');
                this.titleVisible = false;
            }

            if (scroll.x > limit.x - 100 && !this.weitergedachtVisible) {
                this.weitergedacht.classList.remove('hidden');
                this.weitergedachtVisible = true;
            } else if (scroll.x <= limit.x - 100 && this.weitergedachtVisible) {
                this.weitergedacht.classList.add('hidden');
                this.weitergedachtVisible = false;
            }
        });
    };

    hideTitleOnMobile = () => {
        document.ontouchend = () => {
            if (this.titleVisible) {
                this.titleSection.classList.add('hidden');
                this.titleVisible = false;
            }

            if (!this.weitergedachtVisible) {
                this.weitergedacht.classList.remove('hidden');
                this.weitergedachtVisible = true;
            }
        };
    };
}
