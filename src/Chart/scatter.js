import Bubble from "./bubble";

const defaultScatterRadius = 4;
const validScatterShapes = ['circle', 'square', 'triangle', 'plus'];

export default function Scatter(scatterObj, graphObj) {
    let { scatterRadius, scatterShape } = scatterObj;

    // used == to check both 'null' and 'undefined' values
    if (scatterRadius == undefined) {
        scatterObj.scatterRadius = defaultScatterRadius;
    }

    if (validScatterShapes.includes(scatterShape)) {
        scatterObj.scatterImage = `var(--point-${scatterShape})`;
    }

    scatterObj.isScatter = true;

    return new Bubble(scatterObj, graphObj);
}
