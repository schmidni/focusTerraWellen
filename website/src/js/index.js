import '../sass/main.scss';
import InteractiveImage from './components/InteractiveImage';

// check if scroll container is present and initialize locomotive scroll
const scrollcontainer = document.querySelector('[data-scroll-container]');
let app = null;
if (scrollcontainer != null) app = new InteractiveImage(scrollcontainer);

// menu toggle
const toggleMenu = document.getElementById('toggleMenu');
toggleMenu?.addEventListener('click', () => {
    toggleMenu.classList.toggle('active');
});
