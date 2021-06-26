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

const navigation = [
    ...document.getElementsByClassName('navigation'),
    ...document.getElementsByClassName('intro-theme'),
];

const x = window.matchMedia('not all and (hover: hover), not all and (pointer: fine)');

navigation.forEach((nav) => {
    if (x.matches) {
        nav.addEventListener('click', (e) => {
            if (!checkInstanceOfClicked(e, HTMLAnchorElement)) {
                nav.classList.toggle('hover');
                navigation.forEach((rnav) => {
                    if (rnav !== nav) {
                        rnav.classList.remove('hover');
                    }
                });
                document.querySelector('.hero').click();
            }
        });
    }
});
