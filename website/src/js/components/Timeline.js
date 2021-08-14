export default class Timeline {
    constructor(timeline, lscroll) {
        this.stopScroll = window.innerHeight * 0.6;
        this.distance = 400;

        this.timeline = timeline;
        this.linePath = this.timeline.querySelector('.timeline__line path');
        this.bgPath = this.timeline.querySelector('.timeline__background path');
        this.title = this.timeline.querySelector('.timeline__title');
        this.svg = this.linePath.ownerSVGElement;
        this.bgSvg = this.bgPath.ownerSVGElement;
        this.circles = document.getElementsByClassName('timeline__item');
        this.pathRect = this.linePath.getBoundingClientRect();
        this.pathTotalLength = this.linePath.getTotalLength();
        this.startScroll = 0;

        lscroll.on('scroll', ({ scroll }) => {
            this.pathRect = this.linePath.getBoundingClientRect();

            this.circles.forEach((circle, idx) => {
                this.positionElements(scroll, circle, idx);
            });
            this.moveSVG(scroll);
        });
        this.circles.forEach((circle, idx) => {
            this.positionElements({ x: 0, y: 0 }, circle, idx);
        });
    }

    positionElements = (scroll, circle, idx) => {
        const { left, top, height, width } = this.pathRect;
        const relativePageOffset = -top + scroll.y - this.distance * (idx+1);
        const pointPercentage = relativePageOffset / height / 3;
        const pointOnPath = pointPercentage * this.pathTotalLength;
        const pathPoint = this.linePath.getPointAtLength(pointOnPath);
        const x = pathPoint.x / (this.svg.viewBox.baseVal.width / width);
        const y = pathPoint.y / (this.svg.viewBox.baseVal.height / height);

        const scrollY = scroll.y > this.startScroll ? scroll.y + this.startScroll : 
                        scroll.y > this.stopScroll ? this.stopScroll : scroll.y;

        this.checkVisibility(circle, pointPercentage);

        circle.style.transform = `translate(
            ${left + x}px,
            ${top + scrollY + y}px
            )`;
    };

    checkVisibility = (el, pointPercentage) => {
        pointPercentage < 0 || pointPercentage > 1
            ? (el.style.display = 'none')
            : (el.style.display = 'block');
    };

    moveSVG = (scroll) => {
        this.startScroll = this.stopScroll + ((this.circles.length+2)*this.distance) + this.pathRect.height;

        if (scroll.y > this.startScroll){
        }
        else if (scroll.y > this.stopScroll) {
            this.timeline.style.transform = `translateY(${scroll.y - this.stopScroll}px)`;
        }
        else {
            this.timeline.style.transform = `translateY(0px)`;
        }
    };
}
