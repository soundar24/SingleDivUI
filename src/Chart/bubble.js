import { convertRange, unitValue } from '../Base/util';

const BACKGROUND = '--background-';
const defaultBubbleRadius = 10;

export default function Bubble({ points, bubbleOpacity }, { yMin, yMax, chartHeight, chartWidth, startPosition }) {
    var backgroundImage = [],
        backgroundSize = [],
        backgroundPosition = [],
        styles = {};

    // TEMPORARY
    // later this should come from graph.js
    var xMin = 0;
    var xMax = 4;

    points.forEach(function(point, index) {
        var xValue, yValue, radius;

        if (point !== null && typeof point === 'object') {
            xValue = point.x;
            yValue = point.y;

            radius = parseFloat(point.r) > 0
                ? parseFloat(point.r)
                : defaultBubbleRadius;
        }
        else {
            xValue = index;
            yValue = point;
            radius = defaultBubbleRadius;
        }

        var diameter = radius * 2;
        // convert x, y coordinate
        var bubbleX = convertRange(xValue, xMin, xMax, 0, chartWidth);
        var bubbleY = convertRange(yValue, yMin, yMax, 0, chartHeight);

        if (!(bubbleX >= 0)) bubbleX = 0;
        if (!(bubbleY >= 0)) bubbleY = 0;

        // final render positions
        var posX = startPosition + bubbleX - radius;
        var posY = chartHeight - bubbleY - radius;

        backgroundImage.push('var(--bubble)');
        backgroundSize.push(unitValue(diameter) + ' ' + unitValue(diameter));
        backgroundPosition.push(unitValue(posX) + ' ' + unitValue(posY));
    });

    styles[BACKGROUND + 'image'] = backgroundImage.join(', ');
    styles[BACKGROUND + 'size'] = backgroundSize.join(', ');
    styles[BACKGROUND + 'position'] = backgroundPosition.join(', ');
    styles['--bubble-opacity'] = bubbleOpacity || 1;

    return styles;
}