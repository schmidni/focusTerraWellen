export default function closePopupElement(popupElement, closeElement, toggleClass) {
    // callbacks to close popupElement
    let checkClose = null;
    let checkOutside = null;

    // function to check if a click is outside the popupElement
    checkOutside = (evt) => {
        let targetElement = evt.target; // clicked element

        do {
            if (targetElement === popupElement) {
                // This is a click inside. Do nothing, just return.
                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside. Toggle class.
        popupElement.classList.toggle(toggleClass);

        // remove CLOSE event listeners
        document.removeEventListener('click', checkOutside);
        closeElement.removeEventListener('click', checkClose);
    };

    checkClose = () => {
        // toggle class.
        popupElement.classList.toggle(toggleClass);

        // remove CLOSE event listeners
        document.removeEventListener('click', checkOutside);
        closeElement.removeEventListener('click', checkClose);
    };

    // add CLOSE event listeners
    document.addEventListener('click', checkOutside);
    closeElement.addEventListener('click', checkClose);
}
