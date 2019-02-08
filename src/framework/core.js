const generateElement = (component, props, children) => {
    if (typeof component === 'string') {
        return `<${component}>${children.join('')}</${component}>`
    } else {
        return component(props);
    }
}
 
const addEventListener = ({eventType, target, callback}) => {
    document.addEventListener('click', (event) => {
        // if (event.target.classList.contains(targetClassName)){
        //     return callback(event.target);
        // }

    });
}

const createElement = (component, props, children) => {
    const element = generateElement(component, props, children);
    if (typeof element === 'string'){
        return element;
    } else {
        element.events.forEach(addEventListener.bind(null));
        return element.el;
    }
};

const renderElement = (el, container) => {
    container.innerHTML = el;
};

export { createElement, renderElement };