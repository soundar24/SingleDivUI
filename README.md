<p align="center">
    <img src="./assets/logo.png" alt="" width="330" height="" />
</p>
<h2 align="center">
    Charts Built With a Single DIV
</h2>

<p align="center">
    A frontend engineering experiment that explores how far modern CSS can be pushed to render charts without SVG, Canvas, or image assets.
</p>

<p align="center">
  <a href="https://singledivui.com">Website</a> •
  <a href="https://singledivui.com/demos">Demos</a> •
  <a href="https://singledivui.com/docs">Documentation</a> •
  <a href="https://www.npmjs.com/package/singledivui">npm</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/singledivui" target="_blank">
    <img src="https://img.shields.io/npm/v/singledivui?style=flat-square" />
  </a>
  <a href="https://github.com/soundar24/singledivui/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/soundar24/singledivui?style=flat-square" />
  </a>
</p>

<!-- --- -->

![SingleDivUI Showcase](./assets/showcase-image.png)

---

## The Challenge

Some projects start with a requirement.

This one started with a constraint.

SingleDivUI explores a simple but unconventional idea: building charts using only a single HTML element and modern CSS.

The goal was never to replace existing chart libraries. Rather, it was an opportunity to understand browser rendering capabilities at a deeper level, push CSS beyond its conventional use cases, and uncover new possibilities in UI engineering.

The result is a collection of chart components rendered entirely through CSS and a single root DIV element.

## Design Constraints

To make the challenge meaningful, the project was built around a set of deliberate constraints:

- A single root DIV element serves as the foundation for every chart.
- No SVG, Canvas, or image-based rendering is used.
- Charts remain responsive across different viewport sizes.
- Visual customization is supported through configuration options, similar to traditional charting solutions.
- Rendering is designed to remain visually consistent and pixel-accurate across supported browsers.

These constraints transformed a simple charting exercise into a study of creative problem-solving, unconventional rendering techniques, and the practical capabilities of modern CSS.

## Techniques Explored

Building charts with a single HTML element required combining several CSS techniques in unconventional ways:

- CSS Variables
- Linear, Radial, and Conic Gradients
- Multiple Background Layers
- Pseudo Elements
- CSS Calculations
- Transforms

Many of these techniques are commonly used for styling interfaces. In SingleDivUI, they are repurposed as building blocks for rendering chart elements, data points, grid lines, labels, and visual effects.

## The Result

The outcome is more than a collection of charts.

SingleDivUI demonstrates how a set of deliberate constraints, combined with modern CSS capabilities, can produce a flexible charting system.

The project currently supports:

- Line Charts
- Bar Charts
- Area Charts
- Bubble Charts
- Scatter Charts

Each visualization is built upon the same underlying philosophy: using CSS not only as a styling tool, but as a rendering medium.

## Interactive Demos

The best way to understand SingleDivUI is to see it in action.

The demo collection showcases different chart types, rendering techniques, and customization possibilities through a series of interactive examples.

Whether you're evaluating the library or simply curious about the implementation techniques, the demos provide a practical way to explore the project.

Explore the demos: https://singledivui.com/demos

## Quick Start

Creating a chart requires only a few lines of code.

### Installation

```bash
npm install singledivui
```

### Basic Example

```javascript
import { Chart } from 'singledivui';
import 'singledivui/dist/singledivui.min.css';

new Chart('#chart', {
    type: 'line',

    data: {
        labels: ['Jan', 'Feb', 'Mar'],
        series: {
            points: [10, 20, 15]
        }
    }
});
```

Despite the rendering constraints described earlier, the API is intentionally designed to remain simple and familiar to developers who have worked with traditional charting libraries.

For additional examples, customization options, and API documentation, visit the resources below.

## Learn More

- [Interactive Demos](https://singledivui.com/demos)
- [Documentation](https://singledivui.com/docs)
- [API Reference](https://singledivui.com/docs/api-reference)
- [StackBlitz Example](https://stackblitz.com/edit/singledivui-v1)
- [CodePen Example](https://codepen.io/soundar24/pen/zYmGPaz)

## License

SingleDivUI is released under the MIT License.

See the [LICENSE](./LICENSE) file for details.
