const getCheckBoxValue = (inputEl) => {
    return inputEl.indeterminate ? null : inputEl.checked;
};

const readInputValue = (inputType, inputName) => {
    const inputEl = document.getElementById(`${inputType}-input-${inputName}`);
    
    const value = inputEl.type === 'checkbox' ? getCheckBoxValue(inputEl) : inputEl.value;
    return { [inputName]:  value};
};

const readInputValues = (inputNames, inputType) => {
    return inputNames
        .map(readInputValue.bind(null, inputType))
        .reduce((acc, obj) => Object.assign({}, acc, obj), {});
};

const getDataId = (element) => {
    return element.parent.data.id;
};



export { readInputValues, getDataId };

