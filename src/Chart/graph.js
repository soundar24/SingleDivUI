import LinearScale from './linear-scale'
import { convertObjToStyles, unitValue } from './../Base/util';
import { calculateTextWidth } from './../Base/dom-utill';

const math = Math;
const isNumber = (val) => !isNaN(parseFloat(val));
const WHITESPACE_CHAR = '&#160;';

export default function Graph(height, width, xData, yData, graphSettings, extraColumn) {
    var { xAxis = {}, yAxis = {} } = graphSettings;
    var xAxisSetting = Object.assign({}, graphSettings, xAxis);
    var yAxisSetting = Object.assign({}, graphSettings, yAxis);

    var paddingX = xAxisSetting.padding;
    paddingX = (paddingX instanceof Array) ? paddingX : [0, 0];
    var pLeft = paddingX[0] || 0, pRight = paddingX[1] || 0;
    if (extraColumn) pLeft += 1;

    // generate scale-y (based on the scale only we can calculate the row and rowSize)
    var { min: yMin, max: yMax, scale: scaleY } = generateScaleY(yData, yAxisSetting);
    var row = scaleY.length - 1, rowSize = height / row;
    var col = (xData.length - 1) + (pLeft + pRight), columnSize = width / col;
    // to round the nearby value of 0.5
    // this is crucial part, since round-off the columnSize might lead the gap inbetween area
    columnSize = Math.floor(columnSize / 0.5) * 0.5;

    // format the X and Y labels, if the formatter is available
    scaleY = formatData(scaleY, yAxisSetting.labelFormatter);
    xData = formatData(xData, xAxisSetting.labelFormatter);

    // generate scale-x
    var scaleX = generateScaleX(xData, columnSize, xAxisSetting);

    var startPosition = columnSize * pLeft;
    var yLabelWidth = getMaxLabelWidth(scaleY, yAxisSetting);

    // generate the styles related to X and Y axis
    var xStyles = {}, yStyles = {};

    yStyles['--_y-label-width'] = unitValue(yLabelWidth);

    // add the additional required styles for Graph
    xStyles['--_x-label'] = `"${scaleX}"`;
    yStyles['--_y-label'] = `"${scaleY.join('\\a ')}"`;

    // styles for x-axis vertical label
    if (xAxisSetting.verticalLabel) {
        xStyles['--_x-label-height'] = unitValue(columnSize);
        xStyles['--_x-label-direction'] = 'vertical-lr';
    }

    // convert the graphSettings (xAxis & yAxis) props into styles
    var commonStyles = convertPropsToStyles(xAxisSetting, yAxisSetting);
    // below base syles will be commonly used for both Graph and Series
    commonStyles['--_row-size'] = unitValue(rowSize);
    commonStyles['--_column-size'] = unitValue(columnSize);
    commonStyles['--_start-position'] = unitValue(startPosition);

    return {
        row, col,
        rowSize, columnSize,
        yMin, yMax,
        chartMax: height,
        startPosition,
        styles: {
            common: commonStyles,
            x: xStyles,
            y: yStyles
        }
    };
}

function formatData(data, formatter) {
    if (typeof formatter === 'function') {
        return data.map(formatter);
    }
    return data;
}

function getMaxLabelWidth(scaleData, { labelFontSize, labelFontFamily }) {
    var fontStyle = unitValue(labelFontSize) + ' ' + labelFontFamily;
    // most probably the last data will the biggest length one. eg., 1,2,3...1000
    var label1 = scaleData.length > 0 ? scaleData[0] : '';
    // in floating point case, the previous data also can big. eg., ... 39.5, 40
    var label2 = scaleData.length > 1 ? scaleData[1] : '';
    // in case of starting from negative value, first data can be big. eg., -100, ..., 0
    var labelN = scaleData.length > 2 ? scaleData[scaleData.length - 1] : '';
    
    return math.max(
        calculateTextWidth(label1, fontStyle),
        calculateTextWidth(label2, fontStyle),
        calculateTextWidth(labelN, fontStyle)
    );
}

function generateScaleX(xData, columnSize, { labelFontSize, labelFontFamily, verticalLabel }) {
    if (verticalLabel) {
        return xData.join('\\a ');
    }

    var labelFontStyle = unitValue(labelFontSize) + ' ' + labelFontFamily;
    var xLabel = '';
    var whitespaceWidth = calculateTextWidth(WHITESPACE_CHAR, labelFontStyle);
    var extraSpace = 0;

    // a tricky logic to generate the x-axis label with whitespaces
    var appendWhitespace = function (sideSpace) {
        var availableSpace = sideSpace + extraSpace;
        var whitespacCount = math.round(availableSpace / whitespaceWidth);
        if (whitespacCount >= 0) {
            xLabel += ' '.repeat(whitespacCount);
        }
        var occupiedSpace = (whitespacCount * whitespaceWidth);
        extraSpace = availableSpace - occupiedSpace;
    };

    xData.forEach((labelText) => {
        var textWidth = calculateTextWidth(labelText, labelFontStyle);
        var sideSpace = (columnSize - textWidth) / 2;

        appendWhitespace(sideSpace);    // For prefix
        xLabel += labelText;
        appendWhitespace(sideSpace);    // For suffix
    });

    return xLabel;
}

function generateScaleY(data, { maxTicks, startFromZero, customScale }) {
    var minValue, maxValue, step;
    var { min, max, interval } = customScale;
    if (isNumber(min)) minValue = parseFloat(min);
    if (isNumber(max)) maxValue = parseFloat(max);
    if (isNumber(interval)) step = parseFloat(interval);

    // the below can be written as "math.min(...data)"
    // the reason to avoid the spread operator is, during the babel
    // transpiling it will create unwanted pollyfil dependencies.
    // to make the bundle size minimal we can avoid these in the possible way.
    var min = isNumber(minValue) ? minValue : (startFromZero ? 0 : math.min.apply(math, data));
    var max = isNumber(maxValue) ? maxValue : math.max.apply(math, data);

    return LinearScale(min, max, maxTicks, step);
}

function convertPropsToStyles(xAxisSetting, yAxisSetting) {
    var commonSettings = {};
    for (var prop in xAxisSetting) {
        var value = xAxisSetting[prop];
        if (value === yAxisSetting[prop]) {
            commonSettings[prop] = value;
            delete xAxisSetting[prop];
            delete yAxisSetting[prop];
        }
    }

    var commonStyles = convertObjToStyles(commonSettings, '--');
    var xAxisStyles = convertObjToStyles(xAxisSetting, '--x-');
    var yAxisStyles = convertObjToStyles(yAxisSetting, '--y-');

    // merge the xAxis, yAxis and Common styles
    return Object.assign({}, commonStyles, xAxisStyles, yAxisStyles);
}
