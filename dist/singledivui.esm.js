/*!
 * SingleDivUI v1.0.0 | https://singledivui.com/ | (c) 2023 Soundar | MIT License
 */

const math = Math;

function LinearScale(minPoint, maxPoint, maxTicks, stepSize) {
  const result = [];
  let lBound, uBound;

  if (stepSize > 0) {
    lBound = minPoint;
    uBound = maxPoint;
  }
  else {
    const range = niceNum(maxPoint - minPoint, false);
    stepSize = niceNum(range / (maxTicks - 1), true);
    lBound = math.floor(minPoint / stepSize) * stepSize;
    uBound = math.ceil(maxPoint / stepSize) * stepSize;
  }

  var count = math.ceil((uBound - lBound) / stepSize);
  for(let i=0; i<=count; i++) {
    result.push(lBound + (i * stepSize));
  }
  result.reverse();

  return {
    min: lBound,
    max: result[0],
    scale: result,
    step: stepSize
  };
}

function niceNum(localRange, round) {
  var exponent = math.floor(math.log10(localRange)),
    fraction = localRange / math.pow(10, exponent),
    niceFraction;

  if (round) {
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
  } else {
      if (fraction <= 1) niceFraction = 1;
      else if (fraction <= 2) niceFraction = 2;
      else if (fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
  }
  return niceFraction * math.pow(10, exponent);
}

const math$1 = Math;
const defaultUnit = 'px';
const maxFraction = 2;

function deepExtend(sourceObj, targetObj) {
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

function unitValue(value, unit) {
    if(typeof value === 'string' && value != +value) {
        return value;
    }
    return +(+value).toFixed(maxFraction) + (unit || defaultUnit);
}

function calculateAngle(point1, point2, pointsDistance) {
    var diff = point1 - point2;
    var opposite = math$1.abs(diff);
    var hypotenuse = math$1.sqrt(math$1.pow(pointsDistance, 2) + math$1.pow(opposite, 2));

    var sinX = opposite / hypotenuse;
    var x = math$1.asin(sinX);
    var deg = radians_to_degrees(x);

    if (diff < 0) {
        deg = -deg;
    }

    return unitValue(deg, 'deg');
}

function convertRange(value, oldMin, oldMax, newMin, newMax) {
    return (((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin)) + newMin;
}

function convertObjToStyles(propsObj, prefix, excludeProps) {
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
    return radians * (180 / math$1.PI);
}

function throttle(func, interval, context) {
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

const DOCUMENT = document;
const querySelector = (selector) => DOCUMENT.querySelector(selector);
const addClass = (el, classNames) => updateClass(el, 'add', classNames);
const removeClass = (el, classNames) => updateClass(el, 'remove', classNames);
const setWidth = (el, val, forceSet) => setStyleProp(el, 'width', val, forceSet);
const setHeight = (el, val, forceSet) => setStyleProp(el, 'height', val, forceSet);
const isDOM = (obj) => obj && obj instanceof Element;

function injectStyles(stylesJson, targetEle, styleEle) {
    var cssStyle = applyStyles(stylesJson, (targetEle === 'inline'));
    if (cssStyle) {
        if (typeof targetEle === 'string') {
            targetEle = querySelector(targetEle);
        }
        if (!isDOM(targetEle)) {
            targetEle = DOCUMENT.head;  // fallback
        }
        var cssTextEle = DOCUMENT.createTextNode(cssStyle);
        styleEle = styleEle || DOCUMENT.createElement('style');
        targetEle.appendChild(styleEle);
        styleEle.appendChild(cssTextEle);
    }
    return styleEle;
}

function calculateTextWidth(text, fontStyle) {
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

const math$2 = Math;
const isNumber = (val) => !isNaN(parseFloat(val));
const WHITESPACE_CHAR = '&#160;';

function Graph(height, width, xData, yData, graphSettings, extraColumn) {
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
    var label1 = scaleData.length > 0 ? scaleData[0] : '';
    var label2 = scaleData.length > 1 ? scaleData[1] : '';
    
    return math$2.max(
        calculateTextWidth(label1, fontStyle),
        calculateTextWidth(label2, fontStyle)
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
        var whitespacCount = math$2.round(availableSpace / whitespaceWidth);
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
    var min = isNumber(minValue) ? minValue : (startFromZero ? 0 : math$2.min.apply(math$2, data));
    var max = isNumber(maxValue) ? maxValue : math$2.max.apply(math$2, data);

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

const BACKGROUND = '--background-';

function Line({ points, pointRadius, pointStyle, lineSize, isArea }, { columnSize, yMin, yMax, chartMax, startPosition }
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

const BACKGROUND$1 = '--background-';
const defaultBarSize = '60%';

function Bar({ points, barSize, barColor }, { yMin, yMax, chartMax, columnSize, startPosition }) {
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
    };

    points.forEach((point, index) => {
        var barHeight = convertRange(point, yMin, yMax, 0, chartMax);
        if (!(barHeight >= 0)) barHeight = 0; // '>=' is to handle the NaN as well
        var barPosition = (columnSize * index) + barStart;

        backgroundImage.push(getBarImage(index));
        backgroundSize.push(unitValue(barWidth) + ' ' + unitValue(barHeight));
        backgroundPositionX.push(unitValue(barPosition));
    });

    styles[BACKGROUND$1 + 'image'] = backgroundImage.join(', ');
    styles[BACKGROUND$1 + 'size'] = backgroundSize.join(', ');
    styles[BACKGROUND$1 + 'position-x'] = backgroundPositionX.join(', ');

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

const defaultPointRadius = 0;

function Area(areaObj, graphObj) {
    if (areaObj.pointRadius === undefined) {
        areaObj.pointRadius = defaultPointRadius;
    }
    areaObj.isArea = true;
    return new Line(areaObj, graphObj);
}

const series = {
    line: Line,
    bar: Bar,
    area: Area
};

// barSize - this value directly used in bar, so this can be ignored
// pointStyle - this value is no needed directly, so this will be handeled in Line chart
// pointRadius - this also needed when the point is shown, so this will be handeled in Line chart
const excludeProps = ['type', 'barSize', 'pointStyle', 'pointRadius'];

function Series(obj, graphObj) {
    const seriesObj = Object.assign({}, obj);
    const { type } = seriesObj;

    // get the corresponding series class
    var seriesClass = series[type];
    if (seriesClass) {
        // initialize the series, and generate the styles
        var seriesStyles = new seriesClass(seriesObj, graphObj);

        // convert the series custom properties into styles
        var seriesCustomStyles = convertObjToStyles(seriesObj, '--', excludeProps);

        // merge both the styles
        this.styles = Object.assign({}, seriesCustomStyles, seriesStyles);
    }
}

const PLUGIN_NAME = "SingleDivUI.Chart";
// class names
const CLASS_PREFIX = 'sd-';
const CLASS_GRAPH = CLASS_PREFIX + 'graph'; // sd-graph

Chart.prototype = {
    PLUGIN_NAME,
    version: "1.0.0",

    // after the control initialization the updated default values
    // are merged into the options
    options: {},

    // holds the current Chart element
    control: null,

    styleEle: null,

    // default properties of the Chart plugin
    defaults: {
        // type should be 'line', 'bar' or 'area'
        type: null,
        data: {
            labels: [],
            
            series: {
                points: [],

                // ------ for line-chart related customizations ------
                lineColor: null,
                lineSize: null,
                pointRadius: 'sdffd',
                pointColor: null,
                pointBorderWidth: null,
                pointBorderColor: null,
                pointStyle: null,

                // ------ for bar-chart related customizations ------
                barSize: null,
                barColor: null,

                // ------ for area-chart related customizations ------
                areaColor: null
            },
        },

        graphSettings: {
            labelFontSize: '11px',
            labelFontFamily: 'Verdana, Arial, sans-serif',
            gridLineColor: null,
            gridLineSize: null,
            axisLineColor: null,
            axisLineSize: null,
            labelColor: null,
            labelDistance: null,

            xAxis: {
                verticalLabel: false,
                padding: [0, 0],
                labelFormatter: null
            },
            yAxis: {
                maxTicks: 10,
                startFromZero: false,
                labelFormatter: null,

                customScale: {
                    min: null,
                    max: null,
                    interval: null
                }
            }
        },

        height: 220,
        width: 500,
        responsive: false,

        stylesAppendTo: 'head'
    },
    
    _init: function () {
        this._initialize();
        this._render();
    },

    _initialize: function () {
        var chart = this.control;
        var { type, width, height, responsive } = this.options;

        // add the related class names to the root element
        var classNames = CLASS_GRAPH;
        if (type) {
            classNames += ' ' + CLASS_PREFIX + type;
        }
        this.rootClasses = addClass(chart, classNames);

        // set the dimensions of the control, based on the
        // height, width only all the callculations will happen
        setWidth(chart, width);
        setHeight(chart, height);

        // for response support
        if (responsive) {
            if (!this._tResizeFn) {
                this._tResizeFn = throttle(this._onResize, 300, this);
            }
            window.addEventListener('resize', this._tResizeFn);
        }
    },

    _render: function () {
        var chart = this.control;
        var options = this.options;
        var { type, data, graphSettings = {} } = options;
        var seriesObj = data.series;

        // TODO: as of now ignore the series type
        seriesObj.type = type;

        var chartHeight = chart.clientHeight;
        var chartWidth = this.chartWidth = chart.clientWidth;
        var xAxisData = data.labels;
        var yAxisData = seriesObj.points;

        // bar chart needs an additional column, since each bar renders in-between the column
        var needExtraColumn = (type === 'bar');

        // render the Graph
        var graph = new Graph(chartHeight, chartWidth, xAxisData, yAxisData, graphSettings, needExtraColumn);

        // render the Series
        var series = new Series(seriesObj, graph);

        // merge all the required styles with corresponding selectors
        var styles = this._generateStyles(graph, series, type);

        // inject the generated styles into DOM
        this.styleEle = injectStyles(styles, options.stylesAppendTo, this.styleEle);
    },

    _generateStyles: function (graph, series, type) {
        var styles = {},
            selector = this.selector + '.',
            graphStyles = graph.styles,
            seriesStyles = series.styles;
        
        var graph_selector = selector + CLASS_GRAPH,
            graphX_selector = graph_selector + ':after',
            graphY_selector = graph_selector + ':before',
            series_selector = selector + CLASS_PREFIX + type;

        styles[graph_selector] = graphStyles.common;
        styles[graphX_selector] = graphStyles.x;
        styles[graphY_selector] = graphStyles.y;
        if (seriesStyles) {
            styles[series_selector] = seriesStyles;
        }

        return styles;
    },

    _onResize: function () {
        var chart = this.control;
        if (this.chartWidth !== chart.clientWidth) {
            this.refresh();
        }
    },

    // public methods
    update: function (options) {
        deepExtend(this.options, options);
        this.refresh();
    },
    refresh: function () {
        this._clearAll();
        this._init();
    },
    destroy: function () {
        this._clearAll(true);
    },

    // private methods
    _clearAll: function (destroy) {
        var chart = this.control;

        // remove all the chart related classes that added initially
        removeClass(chart, this.rootClasses);

        // remove all the inline styles that added
        if (this.options.stylesAppendTo === 'inline') {
            chart.removeAttribute('style');
        }
        else {
            setWidth(chart, '', true);
            setHeight(chart, '', true);
        }

        // remove all the dynamic stylesheet that created
        var styleEle = this.styleEle;
        (styleEle || {}).innerHTML = '';

        // unbind the responsive related events
        if (this._tResizeFn) {
            window.removeEventListener('resize', this._tResizeFn);
        }

        // in case of destroy, completely remove the elements and instances
        if (destroy) {
            styleEle && styleEle.remove();
            this.styleEle = null;

            // remove the plugin instance that saved on the element
            delete chart[PLUGIN_NAME];
        }
    }
};

// The plugin constructor
function Chart(selector, options) {
    var control = selector, strSelector = '';
    if (typeof selector === 'string') {
        control = querySelector(selector);
        strSelector = selector;
    }
    if (!isDOM(control)) {
        console.error(PLUGIN_NAME + `: Element(${selector}) is not available!`);
        return;
    }

    // try to get the chart instance from the elment
    // to confirm whether the chart already got initialized
    var instance = control[PLUGIN_NAME];
    if (instance) {
        instance.update(options);
        return instance;
    }

    if (!strSelector) {
        var id = control.id;
        strSelector = id ? '#' + id : '';
    }

    this.control = control;
    this.selector = strSelector || control.tagName.toLowerCase();
    // save the instance on the element for the future reference
    control[PLUGIN_NAME] = this;

    // the options value holds the updated defaults value
    this.options = deepExtend({}, this.defaults);
    deepExtend(this.options, options);

    this._init();
}

export { Chart };
