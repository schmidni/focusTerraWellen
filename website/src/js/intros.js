import LocomotiveScroll from 'locomotive-scroll';
import Timeline from './components/Timeline';
import clamp from './utils/clamp';

let lscroll;
const touch = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');

// If locomotive container exists initialize LocomotiveScroll
const locomotiveElement = document.querySelector('[data-scroll-container]');
if (locomotiveElement) {
    // small hack to use locomotive on desktop screens < 1024
    let mobileLocomotive;
    if (touch.matches) {
        mobileLocomotive = {
            smartphone: { smooth: false, direction: 'vertical' },
            tablet: { smooth: false, direction: 'vertical' },
        };
    } else {
        mobileLocomotive = {
            tablet: { breakpoint: 0 },
        };
    }
    // initialize locomotive scroll
    lscroll = new LocomotiveScroll({
        el: locomotiveElement,
        smooth: true,
        ...mobileLocomotive,
    });
}

// if typen element exists, add onscroll event to move background
const typenBackground = document.querySelector('.typen__background');
if (typenBackground) {
    lscroll.on('scroll', ({ scroll }) => {
        const { width } = typenBackground.getBoundingClientRect();
        let y;
        if (!touch.matches) {
            typenBackground.style.top = `${scroll.y}px`;
            y = clamp(scroll.y / 2, 0, width / 3);
        } else {
            y = clamp(scroll.y, 0, width * 2);
        }

        typenBackground.style.transform = `translate(${-1 * y}px, 0)`;
    });
}

// if timeline element exists initialize Timeline
const timeline = document.querySelector('.timeline');
if (timeline) {
    // eslint-disable-next-line no-unused-vars
    const tl = new Timeline(timeline, lscroll);
}
