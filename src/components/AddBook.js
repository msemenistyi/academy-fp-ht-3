import { readInputValues } from '../framework/domUtils.js';

const AddBook = (props) => {
    
    const onAddClick = () => {
        const inputNames = ['title', 'author', 'publishingHouse', 'date', 'tags', 'isRead'];
        const newBook = readInputValues(inputNames, 'add');
        props.onBookAdded({ book: newBook })
    };
    
    return {
        el: `
            <h4>Add book</h4>
            <div id="add-book-container">
                <input id='add-input-title' type='text' />
                <input id='add-input-author' type='text' />
                <input id='add-input-publishingHouse' type='text' />
                <input id='add-input-date' type='text' />
                <input id='add-input-tags' type='text' />
                <input id='add-input-isRead' type='checkbox'>
                <button id='add-book-button'>Add</button>
            </div> `,
        events: [{
            eventType: 'click',
            targetClassName: 'add-book-button',
            callback: onAddClick
        }]
    };
};            

export { AddBook };