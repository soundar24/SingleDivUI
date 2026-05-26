import { convertRange, unitValue } from '../Base/util';

const defaultBubbleRadius = 10;

export default function Bubble({ points, isScatter }, { xMin, xMax, yMin, yMax, chartHeight, chartWidth, startPosition }) {
    var backgroundImage = [],
        backgroundSize = [],
        backgroundPosition = [],
        styles = {};

    points.forEach(function(point) {
        if (typeof point !== 'object') {
            return;
        }

        // convert the point x, y coordinate to the bubble position in the chart
        var bubbleX = convertRange(point.x, xMin, xMax, 0, chartWidth);
        var bubbleY = convertRange(point.y, yMin, yMax, 0, chartHeight);

        var radius = point.r || defaultBubbleRadius;
        var diameter = radius * 2;

        // final render positions
        var posX = startPosition + bubbleX - radius;
        var posY = chartHeight - bubbleY - radius;

        backgroundImage.push(isScatter ? 'var(--scatter)' : 'var(--bubble)');
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
