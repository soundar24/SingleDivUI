import Line from './line';
import Bar from './bar';
import Area from './area';
import Bubble from './bubble';
import Scatter from './scatter';
import { convertObjToStyles } from './../Base/util';

const seriesMap = {
    line: Line,
    bar: Bar,
    area: Area,
    bubble: Bubble,
    scatter: Scatter
}

// barSize - this value directly used in bar, so this can be ignored
// pointStyle - this value is no needed directly, so this will be handled in Line chart
// pointRadius - this also needed when the point is shown, so this will be handled in Line chart
// scatterShape - this value will be transformed into scatterImage (--scatter-image), so this can be ignored
const excludeProps = ['type', 'barSize', 'pointStyle', 'pointRadius', 'scatterShape'];

export default function Series(obj, graphObj) {
    const seriesObj = Object.assign({}, obj);
    const { type } = seriesObj;

    // get the corresponding series class
    var seriesClass = seriesMap[type];
    if (seriesClass) {
        // initialize the series, and generate the styles
        var seriesStyles = new seriesClass(seriesObj, graphObj);

        // convert the series custom properties into styles
        var seriesCustomStyles = convertObjToStyles(seriesObj, '--', excludeProps);

        // merge both the styles
        this.styles = Object.assign({}, seriesCustomStyles, seriesStyles);
    }
}
