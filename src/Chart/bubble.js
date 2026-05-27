import { isNumber, convertRange, unitValue } from '../Base/util';

const defaultBubbleRadius = 10;

export default function Bubble({ points, isScatter, scatterRadius }, { xMin, xMax, yMin, yMax, chartHeight, chartWidth, startPosition }) {
    var backgroundImage = [],
        backgroundSize = [],
        backgroundPosition = [],
        styles = {};

    points.forEach(function(point) {
        if (point == null || typeof point !== 'object' || !isNumber(point.x) || !isNumber(point.y)) {
            return;
        }

        // convert the point x, y coordinate to the bubble position in the chart
        var bubbleX = convertRange(parseFloat(point.x), xMin, xMax, 0, chartWidth);
        var bubbleY = convertRange(parseFloat(point.y), yMin, yMax, 0, chartHeight);

        var radius = parseFloat(point.r) || defaultBubbleRadius;
        if (isScatter) radius = scatterRadius;
        var diameter = radius * 2;

        // final render positions
        var posX = startPosition + bubbleX - radius;
        var posY = chartHeight - bubbleY - radius;

        backgroundImage.push('var(--point)');
        backgroundSize.push(unitValue(diameter) + ' ' + unitValue(diameter));
        backgroundPosition.push(unitValue(posX) + ' ' + unitValue(posY));
    });

    styles['--background-image'] = backgroundImage.join(', ');
    if (!isScatter) {
        styles['--background-size'] = backgroundSize.join(', ');
    }
    styles['--background-position'] = backgroundPosition.join(', ');

    return styles;
}
