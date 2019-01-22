const store = (() => {
    const data = Immutable.Map();

    const initialize = () => {
        const books = Immutable.List();

        books.push(Immutable.Map({
            title: `Mathematician's Delight`,
            author: `W. W. Sawyer`,
            publishingHouse: 'Penguin Books',
            date: '2019-01-22T18:01:16.676Z',
            tags: ['math', 'english'],
            isRead: false
        }));
    };

    const add = book => book;
    const edit = book => book;
    const remove = book => book;
    const markAsRead = book => book;
    const filterBy = book => book;
    const filterRead = book => book;
    const getList = () => data;

    return { add, edit, remove, markAsRead, filterBy, filterRead, getList };
})();