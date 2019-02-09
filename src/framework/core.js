import { match } from './utils.js';

const generateElement = (component, props, children) => {
    if (typeof component === 'string') {
        return `<${component}>${children.join('')}</${component}>`
    } else {
        return component(props);
    }
}
 
const addEventListener = ({eventType, target, callback}) => {
    document.addEventListener(eventType, (event) => {
        if (match(event.target, target)){
            callback(event.target);
        }
    });
}

const createElement = (component, props, children) => {
    const element = generateElement(component, props, children);
    if (typeof element === 'string'){
        return element;
    } else {
        element.events.forEach(addEventListener);
        return element.el;
    }
};

const renderElement = (el, container) => {
    container.innerHTML = el;
};

export { createElement, renderElement };