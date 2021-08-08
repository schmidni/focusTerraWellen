import imagesLoaded from 'imagesloaded';
import InteractiveImage from './components/InteractiveImage';

// check if scroll container is present and initialize locomotive scroll
// const scrollcontainer = document.querySelector('[data-scroll-container]');
const scrollcontainer = document.getElementById('data-scroll-container');

// eslint-disable-next-line no-unused-vars
let app = null;
if (scrollcontainer != null) {
    const image = document.querySelector('.fullscreen-image__img');
    imagesLoaded(image, () => (app = new InteractiveImage(scrollcontainer)));
}
