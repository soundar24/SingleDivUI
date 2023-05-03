<p align="center">
    <img src="/assets/logo.png" alt="" width="330" height="" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/singledivui" target="_blank">
    <img src="https://img.shields.io/npm/v/singledivui?style=flat-square" />
  </a>
  <a href="https://github.com/soundar24/singledivui/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/soundar24/singledivui?style=flat-square" />
  </a>
</p>

<p align="center">
  <a href="https://singledivui.com"> https://singledivui.com </a> <br />
</p>

<p align="center">
  A list of Chart components that made with a <b>single div</b> element.
</p>

<a href="https://singledivui.com">
    <img src="/assets/showcase.png" alt="singledivui - Line chart, Bar chart, Area chart" />
</a>

---

## Intro
The SingleDivUI is a simple and smallest UI components library which includes Line chart, Bar chart, Area chart (and more coming on). Here the complete component was made up of with a single DIV element alone, with the CSS capabilities. There is no images, SVG or Canvas nothing used.

<!-- toc -->
## Table of contents

- [Getting started](#getting-started)
- [Quickstart](#quickstart)
- [APIs](#apis)
- [Demos](#demos)
- [Screenshots](#screenshots)
- [Facts](#facts)
- [License](#license)

<!-- tocstop -->
---

## Getting started

Refer the [Getting started](https://singledivui.com/docs/getting-started) documentation for the detailed information.

## Quickstart

The simple and easiest way to try and start using **SingleDivUI's** Chart component is using the editable samples from **CodePen** or **StackBlitz**. Try the below basic chart,
* demo based on **npm**
    * <a href="https://stackblitz.com/edit/singledivui-v1"> StackBlitz Demo </a>
* demo based on CDN
    * <a href="https://codepen.io/soundar24/pen/zYmGPaz"> CodePen Demo </a>


Just fork the above samples and try to edit yourself for more customization. Also refer the [API Reference](/docs/api-reference) document to know about the available options.

## APIs

Here are the complete list of APIs from the Chart component.

Please note that these are the all available API's with their default values. So to create a basic Chart you don't need to include all of these, for the customization only these needed.

Refer the [Usage](https://singledivui.com/docs/getting-started#usage) section for the basic Chart creation, also refer the [API Reference](https://singledivui.com/docs/api-reference) for the detailed information of these APIs.

```JavaScript
new Chart('#chart',  {
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
});
```

## Demos

Refer the [Demos](https://singledivui.com/demos/line-chart/basic) section to check out multiple demo samples and customizations.

## Screenshots

![singledivui - line chart, bar chart, area chart - colourful appearances](/assets/Screenshot-1.png)

![singledivui - line chart, bar chart, area chart - customization](/assets/Screenshot-2.png)

## Facts
- The complete rendering was done by CSS, and inside a single div alone
- The size of the library is very small with no dependencies
- No built-in interactions, based on the requirement it can be added in the near future
- No animation, but still CSS transition will works on dynamic data update
- Inspired by Lynn Fisher's CSS drawing with a <a href="https://singlediv.com/">single div</a>

## License

[MIT](https://github.com/soundar24/SingleDivUI/blob/main/LICENSE)
