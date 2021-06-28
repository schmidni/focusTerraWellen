import '../sass/main.scss';
import InteractiveImage from './components/InteractiveImage';
import checkInstanceOfClicked from './utils/checkInstanceOfClicked';

// check if scroll container is present and initialize locomotive scroll
const scrollcontainer = document.querySelector('[data-scroll-container]');
let app = null;
// eslint-disable-next-line no-unused-vars
if (scrollcontainer != null) app = new InteractiveImage(scrollcontainer);

// menu toggle
const toggleMenu = document.getElementById('toggleMenu');
toggleMenu?.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
});

// collect all navigation elements
const navigation = [
    ...document.getElementsByClassName('navigation'),
    ...document.getElementsByClassName('intro-theme'),
];

// construct media query
const x = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');
if (x.matches) {
    // attach event listener to all navigation elements
    navigation.forEach((nav) => {
        nav.addEventListener('click', (e) => {
            // don't execute if link is clicked
            if (!checkInstanceOfClicked(e, HTMLAnchorElement)) {
                // toggle class
                nav.classList.toggle('hover');
                // remove class from all other nav elements
                navigation.forEach((otherNav) => {
                    if (otherNav !== nav) {
                        otherNav.classList.remove('hover');
                    }
                });
            }
        });
    });
}
