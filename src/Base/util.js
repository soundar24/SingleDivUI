const math = Math;
const defaultUnit = 'px';
const maxFraction = 2;

export function deepExtend(sourceObj, targetObj) {
    targetObj = targetObj || {};
    for (var key in targetObj) {
        var value = targetObj[key];
        var valueType = Object.prototype.toString.call(value);

        if (valueType === '[object Object]') {
            sourceObj[key] = deepExtend(sourceObj[key] || {}, value);
        }
        else {
            sourceObj[key] = value;
        }
    }
    return sourceObj;
}

export function unitValue(value, unit) {
    if(typeof value === 'string' && value != +value) {
        return value;
    }
    return +(+value).toFixed(maxFraction) + (unit || defaultUnit);
}

export function calculateAngle(point1, point2, pointsDistance) {
    var diff = point1 - point2;
    var opposite = math.abs(diff);
    var hypotenuse = math.sqrt(math.pow(pointsDistance, 2) + math.pow(opposite, 2));

    var sinX = opposite / hypotenuse;
    var x = math.asin(sinX);
    var deg = radians_to_degrees(x);

    if (diff < 0) {
        deg = -deg;
    }

    return unitValue(deg, 'deg');
}

export function convertRange(value, oldMin, oldMax, newMin, newMax) {
    return (((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin)) + newMin;
}

export function convertObjToStyles(propsObj, prefix, excludeProps) {
    var styles = {};
    var addStyle = function (prop, val) {
        var isValid = typeof val === 'string' || typeof val === 'number';
        var canAdd = !excludeProps || !excludeProps.includes(prop);

        if (isValid && canAdd) {
            styles[(prefix || '') + camelToKebabCase(prop)] = unitValue(val);
        }
    };

    for (var prop in propsObj) {
        var val = propsObj[prop];
        addStyle(prop, val);
    }
    return styles;
}

function camelToKebabCase(str) {
    return str.split(/(?=[A-Z])/).join('-').toLowerCase();
}

function radians_to_degrees(radians) {
    return radians * (180 / math.PI);
}

export function throttle(func, interval, context) {
    let shouldFire = true;
    return function() {
        if (shouldFire) {
            shouldFire = false;
            setTimeout(() => {
                shouldFire = true;
                func.call(context);
            }, interval);
        }
    }
 }
