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

    // set the text box position in relation to the space available
    updateTextBox = () => {
        // don't compute new position if on mobile
        if (!window.matchMedia('(max-width: 800px)').matches) {
            // desktop
            const { height, width } = document
                .querySelector('.fullscreen-image__img')
                .getBoundingClientRect();
            const margin = height / 40;

            const originX = (this.pos.x / 100) * width;
            const originY = (this.pos.y / 100) * height;

            let offsetY = -this.pointer.offsetHeight;
            let offsetX = this.pointer.offsetWidth / 2;

            const textBoxHeight = height * 0.7; // hardcoded value from CSS 70vh
            const textBoxWidth = this.textBox.offsetWidth;

            if (originY + offsetY + textBoxHeight >= height - margin) {
                offsetY = height - originY - textBoxHeight - margin;
            } else if (originY + offsetY < 0) {
                offsetY = -originY + margin;
            }

            if (originX + offsetX > width - textBoxWidth) {
                offsetX -= textBoxWidth;
            }

            this.textBox.style.left = `${offsetX}px`;
            this.textBox.style.top = `${offsetY}px`;
        } else {
            this.textBox.style.left = 0;
            this.textBox.style.top = 0;
        }
    };

    // event listener to open textBox
    createToggle = () => {
        this.pointer.addEventListener('click', () => {
            // somehow not needed anymore?
            // e.stopImmediatePropagation();

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
