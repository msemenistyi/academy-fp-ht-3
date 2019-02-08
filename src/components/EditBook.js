const EditBook = (props) => {
     
    const onEditClick = () => {
        const inputNames = ['title', 'author', 'publishingHouse', 'date', 'tags', 'isRead'];
        
        const book = readInputValues([...inputNames, 'id'], 'edit');
        props.onBookEdited(book);
    };
    
    const emptyBook = Immutable.Map({
        id: '',
        title: '',
        author: '',
        publishingHouse: '',
        date: '',
        tags: '',
        isRead: false
    }); 

    const book = props.book || emptyBook;
    const disabled = Boolean(props.book) ? '' : 'disabled';

    const editInputsHTML = `
        <h4>Edit book</h4>
        <div>
            <input id='edit-input-id' type='hidden' value="${book.get('id')}" ${disabled}/>
            <input id='edit-input-title' type='text' value="${book.get('title')}" ${disabled}/>
            <input id='edit-input-author' type='text' value="${book.get('author')}" ${disabled} />
            <input id='edit-input-publishingHouse' type='text' value="${book.get('publishingHouse')}" ${disabled}/>
            <input id='edit-input-date' type='text' value="${book.get('date')}" ${disabled}/>
            <input id='edit-input-tags' type='text' value="${book.get('tags')}" ${disabled}/>
            <input id='edit-input-isRead' type='checkbox' ${book.get('isRead') ? 'checked': ''} ${disabled}>
            <button id='edit-input-button' ${disabled}>Edit</button>
        </div>
    `;

    return {
        el: editInputsHTML,
        events: [{
            eventType: 'click',
            target: {id: 'edit-input-button'},
            callback: onEditClick
        }]        
    };
};

export { EditBook }