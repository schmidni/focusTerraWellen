export default function checkInstanceOfClicked(e, instance) {
    let targetElement = e.target;

    do {
        if (targetElement instanceof instance) {
            // This is a click inside. Do nothing, just return.
            return true;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    return false;
}
