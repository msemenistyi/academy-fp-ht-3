const eventBus = new EventEmitter();

ui.initialize({eventBus: eventBus});
store.initialize({eventBus: eventBus});

