export default function closePopupElement(popupElement, closeElement, toggleClass) {
    let checkClose = null;

    const checkOutside = (evt) => {
        let targetElement = evt.target; // clicked element

        do {
            if (targetElement === popupElement) {
                // This is a click inside. Do nothing, just return.
                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside.
        popupElement.classList.toggle(toggleClass);
        document.removeEventListener('click', checkOutside);
        closeElement.removeEventListener('click', checkClose);
    };

    checkClose = () => {
        popupElement.classList.toggle(toggleClass);
        document.removeEventListener('click', checkOutside);
        closeElement.removeEventListener('click', checkClose);
    };

    document.addEventListener('click', checkOutside);
    closeElement.addEventListener('click', checkClose);
}
