import closePopupElement from '../utils/closePopupElement';

export default class InfoBox {
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

    createToggle = () => {
        this.pointer.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            this.element.classList.toggle('active');

            closePopupElement(this.element, this.close, 'active');
        });
    };

    stopStartLocoScroll = () => {
        this.textBox.onmouseover = () => {
            this.lscroll.stop();
        };
        this.textBox.onmouseout = () => this.lscroll.start();
    };
}
