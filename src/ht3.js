import ui from './ui.js';
import store from './store.js';

const eventBus = new EventEmitter();

ui.initialize({eventBus: eventBus});
store.initialize({eventBus: eventBus});

