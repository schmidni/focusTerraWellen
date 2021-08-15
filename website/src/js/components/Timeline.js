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
        this.pathRect = this.linePath.getBoundingClientRect();
        this.pathTotalLength = this.linePath.getTotalLength();
        this.titleHeight = this.title.getBoundingClientRect().height;

        // distance between timeline items
        this.itemSpacing = 400;
        this.timelineLength = (this.items.length-1)*this.itemSpacing;

        // after how much scrolling the timeline is over
        this.startScroll = this.titleHeight + this.timelineLength;

        //set main container height
        this.updateContainerHeight()

        // update dimensions on resize
        window.addEventListener('resize', () => {
            this.pathRect = this.linePath.getBoundingClientRect();
            this.titleHeight = this.title.getBoundingClientRect().height;
            this.startScroll = this.titleHeight + this.timelineLength;
            this.updateContainerHeight()
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
        const animationDelay = this.titleHeight + (this.itemSpacing * idx)
        const relativePageOffset =  scroll.y - animationDelay;

        // how far along the path - controls speed
        const pointPercentage = relativePageOffset / height / 3;
        const pointOnPath = pointPercentage * this.pathTotalLength;

        // get x and y offset from path origin
        const pathPoint = this.linePath.getPointAtLength(pointOnPath);

        // account for svg being scaled
        const x = pathPoint.x / (this.svg.viewBox.baseVal.width / width);
        const y = pathPoint.y / (this.svg.viewBox.baseVal.height / height);

        // offset of path to the top of the page
        const topOffset = this.titleHeight + (window.innerHeight - height)/2;

        // only make element visible when on line
        this.checkVisibility(circle, pointPercentage);

        // set actual translation on element
        circle.style.transform = `translate(
            ${left + x}px,
            ${topOffset + y - 6}px
            )`;
    };

    updateContainerHeight = () => {
        const bottomTitleHeight = this.bottomTitle.getBoundingClientRect().height;
        const heightFixedContainer = this.titleHeight + window.innerHeight + bottomTitleHeight;
        this.timeline.style.height = `${heightFixedContainer + this.timelineLength}px`;
        this.lscroll.update();
    }

    checkVisibility = (el, pointPercentage) => {
        pointPercentage < 0 || pointPercentage > 1
            ? (el.style.display = 'none')
            : (el.style.display = 'block');
    };

    moveSVG = (scroll) => {
        if (scroll.y < this.titleHeight) {
            this.timeline.style.transform = `translateY(0px)`;
        }
        else if (scroll.y < this.startScroll ) {
            // stop scroll
            this.timeline.style.transform = `translateY(${scroll.y - this.titleHeight}px)`;
        }
    };
}
