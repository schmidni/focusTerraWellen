import closePopupElement from '../utils/closePopupElement';

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
    }

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
