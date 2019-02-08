import { renderElement, createElement } from './framework/core.js';
import { Layout } from './components/Layout.js'
import { useState } from './framework/hooks.js';
import { emitAction, subscribeToStore } from './store.js';

const render = (props) => {
    renderElement(createElement(Layout, props), document.getElementById('root'));
};

const onBookAdded = (params) => {
    emitAction({type: 'ADD_BOOK', params});
}

const onBookEdited = (params) => {
    emitAction({type: 'EDIT_BOOK', params});
}

const onRemoveBook = (params) => {
    emitAction({type: 'REMOVE_BOOK', params});
}

const onEditBook = (params) => {
    emitAction({type: 'BOOK_TO_EDIT', params});
}

const onFilter = (params) => {
    emitAction({type: 'FILTER_BOOK', params});
}

const initialize = () => {
    subscribeToStore((newState) => {
        const booksFromStorage = newState.get('books');
        const [ books, setBooks ] = useState('books');
        setBooks(booksFromStorage);
        render({ books: booksFromStorage, onBookAdded, onBookEdited, onRemoveBook, onEditBook, onFilter});
    });
};

export { initialize };