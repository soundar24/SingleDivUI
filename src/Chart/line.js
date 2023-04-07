import { convertRange, calculateAngle, unitValue } from '../Base/util';

const BACKGROUND = '--background-';

export default function Line({ points, pointRadius, pointStyle, lineSize, isArea }, { columnSize, yMin, yMax, chartMax, startPosition }
) {
    var defaultPointRadius = isArea ? 0 : 6,
        backgroundImage = [],
        backgroundPosition = [],
        styles = {},
        halfColumnSize = columnSize / 2,
        layerPaddingX = 0, layerPaddingY = 0,
        layerStart = startPosition,
        pointRadius = parseFloat(pointRadius),
        pointRadius = pointRadius >= 0 ? pointRadius : defaultPointRadius,
        showPoint = pointRadius > 0,
        showLine = !(parseFloat(lineSize) <= 0),
        prevPointY;

    if (showPoint) {
        layerPaddingX = pointRadius;
        layerPaddingY = isArea ? 0 : pointRadius;
        layerStart += layerPaddingX;
    }

    points.forEach((point, index) => {
        var pointY = convertRange(point, yMin, yMax, 0, chartMax) + layerPaddingY;

        if (showPoint) {
            var doubleIndex = index * 2;
            var pointX = layerStart + (halfColumnSize * (doubleIndex - 1));

            backgroundImage.push('var(--point)');
            backgroundPosition.push(unitValue(pointX) + ' ' + unitValue(-pointY));
        }

        if (showLine && index > 0) {
            var point1 = prevPointY, point2 = pointY;
            var angle = calculateAngle(point1, point2, columnSize);
            var lineX = layerStart + (columnSize * (index-1));
            var lineY = (point1 + point2) / 2;

            backgroundImage.push(`linear-gradient(${angle}, var(--line))`);
            backgroundPosition.push(unitValue(lineX) + ' ' + unitValue(-lineY));
        }

        prevPointY = pointY;
    });

    if (showPoint || showLine) {
        styles[BACKGROUND + 'image'] = backgroundImage.join(', ');
        styles[BACKGROUND + 'position'] = backgroundPosition.join(', ');
        styles[BACKGROUND + 'size'] = unitValue(columnSize) + ' 200%';
    }
    if (showPoint) {
        if (!!pointStyle) {
            styles['--point-color'] = `var(--${pointStyle}, var(--line-color))`;
        }
        styles['--point-radius'] = unitValue(pointRadius);
        styles['--_layer-padd-x'] = unitValue(layerPaddingX);
        styles['--_layer-padd-y'] = unitValue(layerPaddingY);
    }

    return styles;
}
