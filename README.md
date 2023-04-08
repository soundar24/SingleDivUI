<p align="center">
    <img src="/assets/logo.png" alt="" width="360" height="" />
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

Definitely it's not to compete with any other charting library, this is just came with the fun play with CSS. Any of your thoughts and suggestions are welcomes to improve it.

<!-- toc -->
## Table of contents

- [Getting started](#getting-started)
- [Quick Start](#quick-start)
- [APIs](#apis)
- [Screenshots](#screenshots)
- [Facts](#facts)
- [License](#license)

<!-- tocstop -->
---

## Getting started

Refer the [Getting started](https://singledivui.com/docs/getting-started) documentation for the detailed information.

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
});
```

## Screenshots

![singledivui - line chart, bar chart, area chart - colourful appearances](/assets/Screenshot-1.png)

![singledivui - line chart, bar chart, area chart - customization](/assets/Screenshot-2.png)

## Facts
- The size of the library is very small with no dependencies
- No built-in interactions, based on the requirement it can be added in the near future
- No animation, but still CSS transistion will works on dynamic data update
- Inspired by Lynn Fisher's CSS drawing with a <a href="https://singlediv.com/">single div</a>

## License

[MIT](https://github.com/soundar24/SingleDivUI/blob/main/LICENSE)
