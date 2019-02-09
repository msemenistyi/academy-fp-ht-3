const match = (target, pattern) => {
    return Object.keys(pattern).reduce((acc, key) => {
        return pattern[key] === target[key] && acc;
    }, true);
};

export { match };