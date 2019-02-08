const Book = (book) => `
        <div class='book' data-id='${book.get('id')}'>
            <span class='title'>${book.get('title')}</span>
            <span class='author'>${book.get('author')}</span>
            <span class='publishingHouse'>${book.get('publishingHouse')}</span>
            <span class='date'>${book.get('date')}</span>
            <span class='tags'>${book.get('tags')}</span>
            <input class='isRead' type='checkbox' ${book.get('isRead') ? 'checked': ''} disabled />
            <button class='edit-book-button'>Edit</button>                
            <button class='remove-book-button'>Remove</button>
        </div>   
    `;

export { Book };