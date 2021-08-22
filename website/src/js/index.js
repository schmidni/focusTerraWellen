import checkInstanceOfClicked from './utils/checkInstanceOfClicked';

// menu toggle
const toggleMenu = document.getElementById('toggleMenu');
toggleMenu?.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
});

const scrollIcon = document.getElementsByClassName('icon')[0];
if (scrollIcon) {
    document.addEventListener('wheel', () => {
        scrollIcon.classList.add('icon--hidden');
    });

    document.addEventListener('touchmove', () => {
        scrollIcon.classList.add('icon--hidden');
    });
}

// collect all navigation elements
const navigation = [
    ...document.getElementsByClassName('navigation'),
    ...document.getElementsByClassName('intro'),
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
