import { createElement } from '../framework/core.js';
import { AddBook } from './AddBook.js'
import { EditBook } from './EditBook.js';
import { Filter } from './Filter.js';
import { BookList } from './BookList.js';


const Layout = (props) => {

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

    // const getBookById = (bookId) => {
    //     const [ books ] = useState('books');
    //     const [ key, value] = books.findEntry((el) => el.get('id') === bookId);
    //     return value;
    // };


    return createElement('div', null, [
        createElement(Filter, { onFilter }),
        createElement(BookList, { ...props, onEditBook, onRemoveBook }),
        createElement(AddBook, { onBookAdded }),
        createElement(EditBook, { onBookEdited })
    ]);

};

export { Layout };