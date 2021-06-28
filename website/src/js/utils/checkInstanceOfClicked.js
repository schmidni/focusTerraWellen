export default function checkInstanceOfClicked(e, checkType) {
    let targetElement = e.target;

    do {
        if (targetElement instanceof checkType) {
            // target element is of the respective type, return true
            return true;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    return false;
}
