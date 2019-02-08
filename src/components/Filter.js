const Filter = (props) => {

// const initializeUI = () => {
//     const filterCheckBox = document.getElementById('filter-input-isRead');
//     filterCheckBox.indeterminate = true;
// };

    const onFilterClick = () => {
        const inputNames = ['title', 'author', 'publishingHouse', 'date', 'tags', 'isRead'];
        const filters = readInputValues(inputNames, 'filter');
        props.onFilterClick({ filters });
    };
    return {
        el: `
            <h4>Filter</h4>
            <div id="filter-container">
                <input id='filter-input-title' type='text' />
                <input id='filter-input-author' type='text' />
                <input id='filter-input-publishingHouse' type='text' />
                <input id='filter-input-date' type='text' />
                <input id='filter-input-tags' type='text' />
                <input id='filter-input-isRead' type='checkbox'>
                <button id='filter-button'>Filter</button>
                <button id='filter-clear-button'>Clear</button>
            </div>   
            `,
        events: [{
            eventType: 'click',
            target: { id: 'filter-clear-button' },
            callback: onFilterClick
        }]
    };
};
export { Filter };