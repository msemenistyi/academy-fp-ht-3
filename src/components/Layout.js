import { createElement } from '../framework/core.js';
import { AddBook } from './AddBook.js'
import { EditBook } from './EditBook.js';
import { Filter } from './Filter.js';
import { BookList } from './BookList.js';


const Layout = (props) => {

    // const getBookById = (bookId) => {
    //     const [ books ] = useState('books');
    //     const [ key, value] = books.findEntry((el) => el.get('id') === bookId);
    //     return value;
    // };


    return createElement('div', null, [
        createElement(Filter, { onFilter: props.onFilter }),
        createElement(BookList, {books: props.books, onEditBook: props.onEditBook, onRemoveBook: props.onRemoveBook}),
        createElement(AddBook, { onBookAdded: props.onBookAdded }),
        createElement(EditBook, { onBookEdited: props.onBookEdited })
    ]);

};

export { Layout };