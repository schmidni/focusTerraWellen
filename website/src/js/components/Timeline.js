import clamp from '../utils/clamp';

export default class Timeline {
    constructor(timeline, lscroll) {
        // get html elements
        this.timeline = timeline;
        this.lscroll = lscroll;
        this.linePath = this.timeline.querySelector('.timeline__line path');
        this.title = this.timeline.querySelector('.timeline__title');
        this.bottomTitle = this.timeline.querySelector('.timeline__title--bottom');
        this.svg = this.linePath.ownerSVGElement;
        this.items = document.getElementsByClassName('timeline__item');

        // get dimensions
        this.containerHeight = this.getSvgContainerHeight();
        this.pathRect = this.linePath.getBoundingClientRect();
        this.pathTotalLength = this.linePath.getTotalLength();
        this.titleHeight = this.title.getBoundingClientRect().height;

        // distance between timeline items
        this.minItemSpacing = 200;
        this.minCenturySpacing = 600;
        this.itemDelay = window.innerWidth * 0.3;
        this.distances = this.getItemSpacings();

        this.timelineLength = this.getTimelineLength();

        // after how much scrolling the timeline is over
        this.startScroll = this.titleHeight + this.timelineLength;

        // set main container height
        this.updateTimelineContainerHeight();

        // update dimensions on resize
        window.addEventListener('resize', () => {
            this.pathRect = this.linePath.getBoundingClientRect();
            this.titleHeight = this.title.getBoundingClientRect().height;
            this.containerHeight = this.getSvgContainerHeight();
            this.itemDelay = window.innerWidth * 0.3;
            this.distances = this.getItemSpacings();
            this.timelineLength = this.getTimelineLength();
            this.startScroll = this.titleHeight + this.timelineLength;
            this.updateTimelineContainerHeight();
        });

        // update positions on scroll
        this.lscroll.on('scroll', ({ scroll }) => {
            // update items position on path
            this.items.forEach((circle, idx) => {
                this.positionElements(scroll, circle, idx);
            });
            // stop scrolling
            this.moveSVG(scroll);
        });

        // initial positioning of timeline elements
        this.items.forEach((circle, idx) => {
            this.positionElements({ x: 0, y: 0 }, circle, idx);
        });
    }

    positionElements = (scroll, circle, idx) => {
        const { left, height, width } = this.pathRect;
        // distance to scroll before element starts on path
        const animationDelay = this.titleHeight + this.distances[idx] - this.itemDelay;
        const relativePageOffset = scroll.y - animationDelay;

        // how far along the path - controls speed
        const pointPercentage = relativePageOffset / height / 3;
        const pointOnPath = pointPercentage * this.pathTotalLength;

        // get x and y offset from path origin
        const pathPoint = this.linePath.getPointAtLength(pointOnPath);

        // account for svg being scaled
        const x = pathPoint.x / (this.svg.viewBox.baseVal.width / width);
        const y = pathPoint.y / (this.svg.viewBox.baseVal.height / height);

        // offset of path to the top of the page
        const topOffset = this.titleHeight + (this.containerHeight - height) / 2;

        // only make element visible when on line
        this.checkVisibility(circle, pointPercentage);

        // set actual translation on element
        circle.style.transform = `translate(
            ${left + x}px,
            ${topOffset + y - 6}px
            )`;
    };

    getItemSpacings = () => {
        let years = [];
        let distances = [];

        let centurySpacing = Math.min(this.minCenturySpacing, window.innerWidth);

        this.items.forEach((circle, idx) => {
            years.push(parseFloat(circle.querySelector('.timeline__year').innerHTML));
            if (idx === 0) distances.push(0);
            else {
                let y = clamp(
                    ((years[idx] - years[idx - 1]) / 100) * centurySpacing,
                    this.minItemSpacing,
                    centurySpacing
                );
                distances.push(distances[idx - 1] + y);
            }
        });
        return distances;
    };

    getSvgContainerHeight = () =>
        this.timeline.querySelector('.timeline__svgContainer').getBoundingClientRect().height;

    getTimelineLength = () => this.distances[this.distances.length - 1] + this.itemDelay;

    updateTimelineContainerHeight = () => {
        const bottomTitleHeight = this.bottomTitle.getBoundingClientRect().height;
        const heightFixedContainer = this.titleHeight + this.containerHeight + bottomTitleHeight;
        this.timeline.style.height = `${heightFixedContainer + this.timelineLength}px`;
        this.lscroll.update();
    };

    checkVisibility = (el, pointPercentage) => {
        pointPercentage < 0 || pointPercentage > 1
            ? (el.style.display = 'none')
            : (el.style.display = 'block');
    };

    moveSVG = (scroll) => {
        if (scroll.y < this.titleHeight) {
            // clear offset and let scroll normally
            this.timeline.style.transform = `translateY(0px)`;
        } else if (scroll.y < this.startScroll) {
            // stop scroll
            this.timeline.style.transform = `translateY(${scroll.y - this.titleHeight}px)`;
        }
    };
}
