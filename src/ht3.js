const storeMediator = postal.channel("store");

store.initialize();
ui.renderList(store.getBooks());

