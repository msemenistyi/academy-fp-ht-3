import { emitAction, subscribeToStore } from './store.js'

const useState = (() => {
    let state = Immutable.Map();
    
    return (prop) => {
        return [state.get(prop), (value) => state = state.set(prop, value)];
    }
})();

const renderList = list => {

    const rowsHTML = list.map((row) => {

    return `
        <div class='row' data-id='${row.get('id')}'>
            <span class='title'>${row.get('title')}</span>
            <span class='author'>${row.get('author')}</span>
            <span class='publishingHouse'>${row.get('publishingHouse')}</span>
            <span class='date'>${row.get('date')}</span>
            <span class='tags'>${row.get('tags')}</span>
            <input class='isRead' type='checkbox' ${row.get('isRead') ? 'checked': ''} disabled />
            <button class='edit-book-button'>Edit</button>                
            <button class='remove-book-button'>Remove</button>
        </div>   
    `});

    const listHTML = `<div id='list'>${rowsHTML.join('')}</div>`;
    const container = document.getElementById('list');
    container.innerHTML = listHTML;
};

const getCheckBoxValue = (inputEl) => {
    return inputEl.indeterminate ? null : inputEl.checked;
};

const readInputValue = (inputType, inputName) => {
    const inputEl = document.getElementById(`${inputType}-input-${inputName}`);
    
    const value = inputEl.type === 'checkbox' ? getCheckBoxValue(inputEl) : inputEl.value;
    return { [inputName]:  value};
}

const readInputValues = (inputNames, inputType) => {
    return inputNames
        .map(readInputValue.bind(null, inputType))
        .reduce((acc, obj) => Object.assign({}, acc, obj), {});
}

const renderEditInputs = (inputBook) => {
    
    const emptyBook = Immutable.Map({
        id: '',
        title: '',
        author: '',
        publishingHouse: '',
        date: '',
        tags: '',
        isRead: false
    }); 

    const book = inputBook || emptyBook;
    const disabled = Boolean(inputBook) ? '' : 'disabled';

    const editInputsHTML = `
        <input id='edit-input-id' type='hidden' value="${book.get('id')}" ${disabled}/>
        <input id='edit-input-title' type='text' value="${book.get('title')}" ${disabled}/>
        <input id='edit-input-author' type='text' value="${book.get('author')}" ${disabled} />
        <input id='edit-input-publishingHouse' type='text' value="${book.get('publishingHouse')}" ${disabled}/>
        <input id='edit-input-date' type='text' value="${book.get('date')}" ${disabled}/>
        <input id='edit-input-tags' type='text' value="${book.get('tags')}" ${disabled}/>
        <input id='edit-input-isRead' type='checkbox' ${book.get('isRead') ? 'checked': ''} ${disabled}>
        <button id='edit-input-button' ${disabled}>Edit</button>
    `;

    const container = document.getElementById('edit-book-container');
    container.innerHTML = editInputsHTML;
};

const getBookById = (bookId) => {
    const [ books ] = useState('books');
    const [ key, value] = books.findEntry((el) => el.get('id') === bookId);
    return value;
};

const onAddClick = (inputNames) => {
    const newBook = readInputValues(inputNames, 'add');
    emitAction({type: 'ADD_BOOK', book: newBook });
};

const onRemoveClick = (bookId) => emitAction({type: 'REMOVE_BOOK', bookId });

const onEditClick = (bookId) => {    
    const book = getBookById(bookId);
    renderEditInputs(book);
};

const onEditSaveClick = (inputNames) => {
    const book = readInputValues([...inputNames, 'id'], 'edit');
    emitAction({type: 'EDIT_BOOK', book } );
 
    renderEditInputs();

};

const onFilterClick = (inputNames) => {
    const filters = readInputValues(inputNames, 'filter');
    emitAction({type: 'FILTER_BOOKS', filters });
};

const initializeUI = () => {
    const inputNames = ['title', 'author', 'publishingHouse', 'date', 'tags', 'isRead'];

    const addBookButton = document.getElementById('add-book-button');
    addBookButton.addEventListener('click', onAddClick.bind(null, inputNames));

    const filterButton = document.getElementById('filter-button');
    filterButton.addEventListener('click', onFilterClick.bind(null, inputNames));

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-book-button')){
            onRemoveClick(event.target.parentNode.dataset.id);
        }

        if (event.target.classList.contains('edit-book-button')){
            onEditClick(event.target.parentNode.dataset.id);
        }

        if (event.target.id === 'edit-input-button'){
            onEditSaveClick(inputNames);
        }

    });

    const filterCheckBox = document.getElementById('filter-input-isRead');
    filterCheckBox.indeterminate = true;
};

const initialize = () => {
    initializeUI();

    subscribeToStore((newState) => {
        const booksFromStorage = newState.get('books');
        const [ books, setBooks ] = useState('books');
        setBooks(booksFromStorage);
        renderList(booksFromStorage);
    });
}

export { initialize };