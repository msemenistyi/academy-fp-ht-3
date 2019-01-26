const ui = (() => {
    
    const renderList = list => {

        const rowsHTML = list.map((row) => {

        return `
            <div class='row' data-id='${row.get('id')}'>
                <span class='title'>${row.get('title')}</span>
                <span class='author'>${row.get('author')}</span>
                <span class='publishingHouse'>${row.get('publishingHouse')}</span>
                <span class='date'>${row.get('date')}</span>
                <span class='tags'>${row.get('tags')}</span>
                <input class='isRead' type='checkbox' ${row.get('isRead') ? 'checked': ''} />
                <button class='remove-book-button'>Edit</button>                
                <button class='remove-book-button'>Remove</button>
            </div>   
        `});

        const listHTML = `<div id='list'>${rowsHTML.join('')}</div>`;
        const container = document.getElementById('list');
        container.innerHTML = listHTML;
    };
    
    const onAddClick = () => {
    
    };
    
    const onRemoveClick = () => {
    
    };

    const onEditClick = () => {
    
    };
    
    const onSaveClick = () => {};
    
    const filterBy = (criterion) => {};

    const initializeUI = () => {
        const addBookButton = document.getElementById('add-book-button');
        addBookButton.addEventListener('click', onAddClick);

        document.addEventListener('click', (ev) => {
            if (ev.target.classList.contains('remove-book-button')){
                const id = Number(ev.target.parentNode.dataset.id);
                onRemoveClick(id);
            }
        });

    };

    initializeUI();

    return { renderList, onAddClick, onRemoveClick, onSaveClick, filterBy };
})();