import Bubble from "./bubble";

const defaultScatterRadius = 4;

export default function Scatter(scatterObj, graphObj) {
    if (scatterObj.scatterRadius == undefined) {
        scatterObj.scatterRadius = defaultScatterRadius;
    }
    scatterObj.isScatter = true;
    return new Bubble(scatterObj, graphObj);
}
