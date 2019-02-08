import { Book } from './Book.js';
import { getDataId } from '../framework/domUtils.js';

const BookList = (props) => {

    const onRemoveClick = (target) => {
        const bookId = getDataId(target);
        props.onRemoveBook(bookId);
    };

    const onEditClick = (target) => {    
        const bookId = getDataId(target);
        props.onEditBook(bookId);
    };

    const rowsHTML = props.books.map((row) => Book(row));

    return {
        el: `<div id='list'>${rowsHTML.join('')}</div>`,
        events: [{
            type: 'click',
            target: {className: 'edit-book-button'},
            callback: onEditClick
        }, {
            type: 'click',
            target: {className: 'remove-book-button'},
            callback: onRemoveClick
        }]
    };
};

export { BookList };