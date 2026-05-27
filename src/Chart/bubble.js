import { isNumber, isEven, convertRange, unitValue } from '../Base/util';

const defaultBubbleRadius = 10;

export default function Bubble({ points, isScatter, scatterRadius, scatterShape }, { xMin, xMax, yMin, yMax, chartHeight, chartWidth, startPosition }) {
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

    if (isScatter && scatterShape === 'plus' && isEven(points.length)) {
        duplicateLastPosition(backgroundPosition);
    }

    styles['--background-image'] = backgroundImage.join(', ');
    if (!isScatter) {
        styles['--background-size'] = backgroundSize.join(', ');
    }
    styles['--background-position'] = backgroundPosition.join(', ');

    return styles;
}

function duplicateLastPosition(arr) {
    // NOTE:
    // In Scatter chart, Plus shape internally uses 2 layered linear-gradients.
    //
    // Example:
    // background-image:
    //     linear-gradient(...),
    //     linear-gradient(...)
    //
    // Because of that, each scatter point contributes 2 background-image layers,
    // but background-position contains only 1 entry per point.
    //
    // CSS maps background-* values cyclically when the counts mismatch.
    // With even number of points, the gradient-position pairing breaks
    // and some plus symbols render incorrectly (shows only horizontal dash).
    //
    // WORKAROUND:
    // Duplicate the last background-position entry when point count is even,
    // so the cyclic mapping stays visually aligned.
    //
    // TRADEOFF:
    // Proper fix should explicitly duplicate each background-position entry
    // per gradient layer, but that increases the generated CSS size/weight,
    // so keeping this lightweight workaround for now.
    arr.push(arr[arr.length - 1]);
}
