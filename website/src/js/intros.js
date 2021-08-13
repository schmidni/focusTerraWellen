import LocomotiveScroll from 'locomotive-scroll';
import clamp from './utils/clamp';

let mobileLocomotive;
const touch = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');
// small hack to use locomotive on desktop screens < 1024
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

const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    ...mobileLocomotive,
});

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

        // typenBackground.style.transform = `translate(${-1 * y}px, ${scroll.y}px)`;
        typenBackground.style.transform = `translate(${-1 * y}px, 0)`;
    });
}
