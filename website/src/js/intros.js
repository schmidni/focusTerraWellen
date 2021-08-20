import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import Timeline from './components/Timeline';
import clamp from './utils/clamp';

let lscroll;
const touch = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');

// Check if locomotive scroll container exists
const locomotiveElement = document.querySelector('[data-scroll-container]');
if (locomotiveElement) {
    // small hack to use locomotive on desktop screens < 1024
    let mobileLocomotive;
    if (touch.matches) {
        mobileLocomotive = {
            smartphone: { smooth: true, direction: 'vertical' },
            tablet: { smooth: true, direction: 'vertical' },
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

    // update Locomotive Scroll once all Images have loaded to
    // ensure it has got the correct page height
    imagesLoaded(locomotiveElement, () => {
        lscroll.update();
    });

    // if typen element exists, add onscroll event to move background
    const typenBackground = document.querySelector('.typen__background');
    if (typenBackground) {
        lscroll.on('scroll', ({ scroll }) => {
            const { width } = typenBackground.getBoundingClientRect();
            let y;

            if (!touch.matches) {
                y = clamp(scroll.y / 2, 0, width * 0.55);
            } else {
                y = clamp(scroll.y, 0, width * 1.2);
            }

            typenBackground.style.transform = `translate(${-1 * y}px, ${scroll.y}px)`;
        });
    }

    // if timeline element exists initialize Timeline
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        imagesLoaded(locomotiveElement, () => {
            // eslint-disable-next-line no-unused-vars
            const tl = new Timeline(timeline, lscroll);
        });
    }
}
