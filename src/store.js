const store = (() => {
    const context = {
        state: Immutable.Map(),
        eventBus: {}
    };

    const setState = (prop, map) => {
        const newState = context.state.set(prop, map);
        context.state = newState;
        context.eventBus.emit('setState', newState);
        return newState;
    }

    const getState = (prop) => {
        return context.state.get(prop);
    }

    const initializeSubscriptions = () => {
        context.eventBus.on('action', ({type, ...params}) => {
            switch (type){
                case 'ADD_BOOK': 
                    add(params.book);
                    break;
                case 'REMOVE_BOOK': 
                    remove(params.bookId);
                    break;
                case 'EDIT_BOOK': 
                    edit(params);
                    break;
                case 'FILTER_BOOKS': 
                    filter(params.filters);
                    break;
            }
        });
    }

    const initialize = ({ eventBus }) => {
        context.eventBus = eventBus;

        const list = Immutable.List();
        const books = list.push(Immutable.Map({
            id: (new UUID(1)).format('std'),
            title: `Mathematician's Delight`,
            author: `W. W. Sawyer`,
            publishingHouse: 'Penguin Books',
            date: '2019-01-22T18:01:16.676Z',
            tags: ['math', 'english'],
            isRead: true
        }));
        setState('books', books);

        initializeSubscriptions();

    };

    const add = book => {
        const newBook = Immutable.Map({
            ...book,
            id: (new UUID(1)).format('std')
        });
        const books = getState('books').push(newBook);
        setState('books', books);
    };

    const edit = book => book;
    const remove = bookId => {
        const books = getState('books').filter((book) => book.get('id') !== bookId);
        return setState('books', books);
    };

    const markAsRead = book => book;
    
    const isEmpty = value => {
        return value === '' || value === null;
    }

    const filter = criteria => {
        const books = getState('books').filter((book) => {
            const value = Object.keys(criteria)
                .filter(key => !isEmpty(criteria[key]))
                .reduce((acc, el) => {
                    switch (typeof criteria[el]){
                        case 'string':
                            return acc && book.get(el).includes(criteria[el]);
                        case 'boolean':
                            return acc && book.get(el) === criteria[el];
                        default:
                            return acc && true;
                    }
                }, true);
                return value;
        });
        setState('books', books);
    };
    
    const getBooks = () => {
        return getState('books');
    }

    return { initialize, add, edit, remove, markAsRead, filter, getBooks };
})();