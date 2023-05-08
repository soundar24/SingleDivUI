
export const DOCUMENT = typeof document !== 'undefined' ? document : {};
export const querySelector = (selector) => DOCUMENT.querySelector(selector);
export const addClass = (el, classNames) => updateClass(el, 'add', classNames);
export const removeClass = (el, classNames) => updateClass(el, 'remove', classNames);
export const setWidth = (el, val, forceSet) => setStyleProp(el, 'width', val, forceSet);
export const setHeight = (el, val, forceSet) => setStyleProp(el, 'height', val, forceSet);
export const removeAttribute = (el, attr) => attr && el.removeAttribute(attr);
export const isDOM = (obj) => obj && obj instanceof Element;
export const isVisible = (obj) => !!obj.offsetParent;

export function getUniqueKey() {
    return Math.random().toString(16).slice(2, 10);
}

export function injectStyles(stylesJson, targetEle, styleEle, selector) {
    var cssStyle = applyStyles(stylesJson, (targetEle === 'inline'));
    if (cssStyle) {
        if (typeof targetEle === 'string') {
            targetEle = querySelector(targetEle);
        }
        if (!isDOM(targetEle)) {
            targetEle = DOCUMENT.head;  // fallback
        }
        var cssTextEle = DOCUMENT.createTextNode(cssStyle);
        if (!styleEle) {
            var styleSelector = '';
            if (selector) {
                styleSelector = '#sd-styles' + selector.replace('#', '-').replace('.', '_');

                // check for previous style element and remove it
                var oldStyleEle = DOCUMENT.querySelector(styleSelector);
                if (oldStyleEle) oldStyleEle.remove();
            }
            styleEle = createElement('style' + styleSelector);
        }
        targetEle.appendChild(styleEle);
        styleEle.appendChild(cssTextEle);
    }
    return styleEle;
}

export function calculateTextWidth(text, fontStyle) {
    var tempEle = DOCUMENT.createElement('span');
    setStyleProp(tempEle, 'font', fontStyle);
    tempEle.innerHTML = text;
    DOCUMENT.body.appendChild(tempEle);
    var { width } = tempEle.getBoundingClientRect();
    tempEle.remove();
    return width;
}

function setStyleProp(el, prop, val, forceSet) {
    var isString = typeof val === 'string';
    if (!forceSet && (!isString || (isString && val == +val))) {
        val += 'px';
    }
    el.style[prop] = val;
}

function applyStyles(jsonObj, inline) {
    var styleStr = "";
    for (var selector in jsonObj) {
        var rules = jsonObj[selector];
        if (inline) {
            var ele = querySelector(selector.split(':')[0]);
            for (var prop in rules) {
                ele.style.setProperty(prop, rules[prop]);
            }
        }
        else {
            styleStr += selector + " { ";
            for (var prop in rules) {
                styleStr += prop + ":" + rules[prop] + "; ";
            }
            styleStr += "} \n\n";
        }
    }
    return styleStr;
}

function updateClass(el, mode, classNames) {
    classNames && classNames.split(' ').forEach(name => el.classList[mode](name));
    return classNames;
}

function createElement(tag) {
    var t = tag.split('#');
    var ele = DOCUMENT.createElement(t[0]);
    if (t[1]) ele.id = t[1];
    return ele;
}
