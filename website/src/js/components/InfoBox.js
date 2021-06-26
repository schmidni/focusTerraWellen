import closePopupElement from '../utils/closePopupElement';

export default class InfoBox {
    constructor(element, lscroll) {
        this.element = element;
        this.lscroll = lscroll;
        this.pointer = this.element.querySelector('.interactive-info__pointer');
        this.textBox = this.element.querySelector('.interactive-info__text');
        this.close = this.element.querySelector('.interactive-info__close');
        this.createToggle();
        this.stopStartLocoScroll();
    }

    createToggle = () => {
        this.pointer.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            this.textBox.classList.toggle('text-active');

            closePopupElement(this.textBox, this.close, 'text-active');
        });
    };

    stopStartLocoScroll = () => {
        this.textBox.onmouseover = () => {
            this.lscroll.stop();
        };
        this.textBox.onmouseout = () => this.lscroll.start();
    };
}
