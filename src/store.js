const store = (() => {
    const data = {
        state: Immutable.Map()
    };

    const setState = (prop, map) => {
        return data.state.set(prop, map);
    }

    const getState = (prop, map) => {
        return data.state.set(prop, map);
    }

    const initialize = () => {
        const list = Immutable.List();

        const books = list.push(Immutable.Map({
            id: uuidv1(),
            title: `Mathematician's Delight`,
            author: `W. W. Sawyer`,
            publishingHouse: 'Penguin Books',
            date: '2019-01-22T18:01:16.676Z',
            tags: ['math', 'english'],
            isRead: true
        }));

        return setState('books', books);
    };

    const add = book => book;
    const edit = book => book;
    const remove = bookId => {
        const books = list.filter((book) => book.get('id') === bookId);
        return setState('books', books);
    };

    const markAsRead = book => book;
    const filterBy = book => book;
    const filterRead = book => book;
    const getBooks = () => {
        return getState('books');
    }

    return { initialize, add, edit, remove, markAsRead, filterBy, filterRead, getBooks };
})();