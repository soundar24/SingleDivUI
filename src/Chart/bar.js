import { convertRange, unitValue } from '../Base/util';

const BACKGROUND = '--background-';
const defaultBarSize = '60%';

export default function Bar({ points, barSize, barColor }, { yMin, yMax, chartMax, columnSize, startPosition }) {
    var backgroundImage = [],
        backgroundSize = [],
        backgroundPositionX = [],
        styles = {};

    var halfColumn = columnSize / 2;
    var barWidth = getNumber(barSize, columnSize);
    var halfBar = barWidth / 2;
    var barStart = startPosition - halfColumn - halfBar;
    
    var getBarImage = function(index) {
        if (barColor instanceof Array) {
            var colorsLen = barColor.length;
            if(index >= colorsLen) {
                index %= colorsLen;
            }
            return `linear-gradient(${barColor[index]} 100%, transparent)`;
        }
        return 'var(--bar)';
    }

    points.forEach((point, index) => {
        var barHeight = convertRange(point, yMin, yMax, 0, chartMax);
        if (!(barHeight >= 0)) barHeight = 0; // '>=' is to handle the NaN as well
        var barPosition = (columnSize * index) + barStart;

        backgroundImage.push(getBarImage(index));
        backgroundSize.push(unitValue(barWidth) + ' ' + unitValue(barHeight));
        backgroundPositionX.push(unitValue(barPosition));
    });

    styles[BACKGROUND + 'image'] = backgroundImage.join(', ');
    styles[BACKGROUND + 'size'] = backgroundSize.join(', ');
    styles[BACKGROUND + 'position-x'] = backgroundPositionX.join(', ');

    return styles;
}

function getNumber(value, parentValue) {
    var intValue = parseFloat(value);
    if (typeof value === 'string' && value.match(/%$/)) {
        return (intValue / 100) * parentValue;
    }
    if (intValue > 0) {
        return intValue;
    }
    return getNumber(defaultBarSize, parentValue);
}
