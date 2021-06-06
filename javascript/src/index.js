import App from './components/App';

// check if locomotive scroll container is present and initiate locomotive scroll
const scrollcontainer = document.querySelector('[data-scroll-container]');
let app = null;
if (scrollcontainer != null) app = new App(scrollcontainer);
