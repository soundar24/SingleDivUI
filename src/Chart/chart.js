import Graph from './graph';
import Series from './series';
import { deepExtend, throttle } from '../Base/util';
import {
    querySelector, addClass, removeClass, setWidth, setHeight,
    removeAttribute, isDOM, isVisible, getUniqueKey, injectStyles
} from '../Base/dom-utill';

const PLUGIN_NAME = "SingleDivUI.Chart";
// class names
const CLASS_PREFIX = 'sd-';
const CLASS_CHART = CLASS_PREFIX + 'chart'; // sd-chart
const CLASS_GRAPH = CLASS_PREFIX + 'graph'; // sd-graph

Chart.prototype = {
    PLUGIN_NAME,
    version: "__VERSION__",

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
                pointRadius: null,
                pointColor: null,
                pointBorderWidth: null,
                pointBorderColor: null,
                pointStyle: null,
                pointInnerColor: null,
                dotRadius: null,

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

        height: 260,
        width: '100%',
        responsive: true,

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
        var classNames = CLASS_CHART + ' ' + CLASS_GRAPH;
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
        this.styleEle = injectStyles(styles, options.stylesAppendTo, this.styleEle, this.selector);
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
        if (!options) return;
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
            removeAttribute(chart, 'style');
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

            // remove the uniqueKey if anything generated
            removeAttribute(chart, this._uniKey);

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
    if (!isVisible(control)) {
        console.warn(PLUGIN_NAME + ': Element seems not visible in the DOM, this might cause the styling issues!\n\n' +
            'To resolve that call the refresh method when the Chart become visible in the DOM. \n', control);
    }

    // try to get the chart instance from the elment
    // to confirm whether the chart already got initialized
    var instance = control[PLUGIN_NAME];
    if (instance) {
        instance.update(options);
        return instance;
    }

    if (!strSelector) {
        if (control.id) {
            strSelector = '#' + control.id;
        }
        else {
            var uniqueKey = this._uniKey = 'data-sd-' + getUniqueKey();
            control.setAttribute(uniqueKey, '');
            strSelector = `[${uniqueKey}]`;
        }        
    }

    this.control = control;
    this.selector = strSelector;
    // save the instance on the element for the future reference
    control[PLUGIN_NAME] = this;

    // the options value holds the updated defaults value
    this.options = deepExtend({}, this.defaults);
    deepExtend(this.options, options);

    this._init();
}

export default Chart;
