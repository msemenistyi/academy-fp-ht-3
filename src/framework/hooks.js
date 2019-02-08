const useState = (() => {
    let state = Immutable.Map();
    
    return (prop) => {
        return [state.get(prop), (value) => state = state.set(prop, value)];
    }
})();

export { useState }