import LocomotiveScroll from 'locomotive-scroll';
import debounce from '../utils/debounce';
import InteractiveInfo from './InteractiveInfo';

export default class InteractiveImage {
    constructor(scrollContainer) {
        this.titleSection = document.querySelector('.fullscreen-image__titlesection');
        this.weitergedacht = document.querySelector('.fullscreen-image__weitergedacht');
        this.weitergedachtPointer = document.querySelector('#pointer-weitergedacht');
        this.fullscreenImage = document.querySelector('.fullscreen-image__img');
        this.annotations = [...document.getElementsByClassName('annotations__element')];
        this.titleVisible = true;
        this.mobileLocomotive = {};
        this.isTouch = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');

        // small hack to use locomotive on desktop screens < 1024
        if (this.isTouch.matches) {
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

        // set position on first load
        this.updatePosition();
        // add event listener to update position when window is resized
        window.addEventListener('resize', debounce(this.updatePosition, 100));

        // set up event listeners for 'weitergedacht'
        this.showWeitergedacht();

        // set up event listener to hide Title
        if (this.isTouch.matches) this.hideTitleOnMobile();
        else this.hideTitleOnScroll();
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
            annot.style.transform = `rotate(${annot.dataset.rot}deg)`;
        });

        // update weitergedacht position
        const weiterLeft = `${width - this.weitergedacht.getBoundingClientRect().width}px`;
        this.weitergedacht.style.left = weiterLeft;

        // update weitergedacht weitergedacht pointer position
        this.weitergedachtPointer.style.left = `calc(${width - 200}px`;
        this.weitergedachtPointer.style.bottom = `90px`;
    };

    hideTitleOnScroll = () => {
        // hide title section on scroll event
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
        const menu = document.getElementById('toggleMenu');
        const background = document.querySelector('.menu__background');

        if (window.innerWidth < 800) {
            menu.style.opacity = 0.4;
            background.style.opacity = 0.0;
        }
        document.ontouchend = () => {
            if (this.titleVisible) {
                this.titleSection.classList.add('hidden');
                this.titleVisible = false;
                menu.style.opacity = 1;
                background.style.opacity = 1;
            }
        };
    };

    showWeitergedacht = () => {
        const close = this.weitergedacht.querySelector('#close-weitergedacht');
        close.addEventListener('click', () => {
            this.weitergedacht.classList.add('hidden');
            this.weitergedachtPointer.classList.remove('hidden');
        });

        this.weitergedachtPointer.addEventListener('click', () => {
            this.weitergedacht.classList.remove('hidden');
            this.weitergedachtPointer.classList.add('hidden');
        });
    };
}
