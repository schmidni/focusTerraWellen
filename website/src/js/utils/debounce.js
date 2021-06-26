export default function debounce(func, time = 100) {
    let timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}
