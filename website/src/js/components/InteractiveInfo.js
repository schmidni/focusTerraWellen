import closePopupElement from '../utils/closePopupElement';
import debounce from '../utils/debounce';

export default class InteractiveInfo {
    constructor(element, lscroll) {
        this.element = element;
        this.lscroll = lscroll;
        this.pointer = this.element.querySelector('.interactive-info__pointer');
        this.textBox = this.element.querySelector('.interactive-info__text');
        this.close = this.element.querySelector('.interactive-info__close');
        this.pos = { x: this.element.dataset.posx, y: this.element.dataset.posy };

        this.createToggle();
        this.stopStartLocoScroll();
        this.updateTextBox();

        window.addEventListener('resize', debounce(this.updateTextBox, 30));
    }

    updateTextBox = () => {
        // don't compute position if  in fullscreen mode
        if (window.matchMedia('(min-width: 720px)')) {
            const { height, width } = document
                .querySelector('.fullscreen-image__img')
                .getBoundingClientRect();

            const margin = height / 50;

            const originX = (this.pos.x / 100) * width;
            const originY = (this.pos.y / 100) * height;

            let offsetY = -this.pointer.offsetHeight;
            let offsetX = this.pointer.offsetWidth / 2;

            if (originY + offsetY > height - this.textBox.offsetHeight) {
                offsetY = height - originY - this.textBox.offsetHeight - margin;
            } else if (originY + offsetY < 0) {
                offsetY = -originY + margin;
            }

            if (originX + offsetX > width - this.textBox.offsetWidth) {
                offsetX = -this.textBox.offsetWidth;
            }

            this.textBox.style.left = `${offsetX}px`;
            this.textBox.style.top = `${offsetY}px`;
        } else {
            console.log('too small');
        }
    };

    // event listener to open textBox
    createToggle = () => {
        this.pointer.addEventListener('click', (e) => {
            // stop event so it doesn't trigger close listeners
            e.stopImmediatePropagation();

            // toggle active class
            this.element.classList.toggle('active');

            // event listeners to close textBox on close button or outside click
            closePopupElement(this.element, this.close, 'active');
        });
    };

    // disable horizontal scroll if mouse is on textBox
    stopStartLocoScroll = () => {
        this.textBox.onmouseover = () => {
            this.lscroll.stop();
        };
        this.textBox.onmouseout = () => this.lscroll.start();
    };
}
