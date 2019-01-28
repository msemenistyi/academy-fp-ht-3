const ui = (() => {
    
    const context = {
        eventBus: {}
    }

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
                <button class='remove-book-button'>Edit</button>                
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
        const inputEl = document.getElementById(`${inputType}-${inputName}`);
        
        const value = inputEl.type === 'checkbox' ? getCheckBoxValue(inputEl) : inputEl.value;
        return { [inputName]:  value};
    }
    
    const readInputValues = (inputType) => {
        const inputNames = ['title', 'author', 'publishingHouse', 'date', 'tags', 'isRead'];
        return inputNames.map(readInputValue.bind(null, inputType)).reduce((acc, obj) => Object.assign({}, acc, obj), {});
    }

    const onAddClick = () => {
        const newBook = readInputValues('input');
        context.eventBus.emit('action', {type: 'ADD_BOOK', book: newBook });
    };
    
    const onRemoveClick = (bookId) => context.eventBus.emit('action', {type: 'REMOVE_BOOK', bookId });

    const onEditClick = () => {
    
    };
    
    const onSaveClick = () => {};
    
    const onFilterClick = () => {
        const filters = readInputValues('filter');
        context.eventBus.emit('action', {type: 'FILTER_BOOKS', filters });
    };

    const initializeUI = () => {
        const addBookButton = document.getElementById('add-book-button');
        addBookButton.addEventListener('click', onAddClick);

        const filterButton = document.getElementById('filter-button');
        filterButton.addEventListener('click', onFilterClick);

        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-book-button')){
                onRemoveClick(event.target.parentNode.dataset.id);
            }
        });

        const filterCheckBox = document.getElementById('filter-isRead');
        filterCheckBox.indeterminate = true;

    };

    const initializeSubscriptions = () => {
        context.eventBus.on('setState', (newState) => {
            const books = newState.get('books');
            renderList(books);
        })
    };

    const initialize = ({ eventBus }) => {
        context.eventBus = eventBus;
        initializeUI();
        initializeSubscriptions();
    };

    return { initialize };
})();