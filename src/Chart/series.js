import Line from './line';
import Bar from './bar';
import Area from './area';
import { convertObjToStyles } from './../Base/util';

const series = {
    line: Line,
    bar: Bar,
    area: Area
}

// barSize - this value directly used in bar, so this can be ignored
// pointStyle - this value is no needed directly, so this will be handeled in Line chart
// pointRadius - this also needed when the point is shown, so this will be handeled in Line chart
const excludeProps = ['type', 'barSize', 'pointStyle', 'pointRadius'];

export default function Series(obj, graphObj) {
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
