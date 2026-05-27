import Bubble from "./bubble";

const defaultScatterRadius = 3;

export default function Scatter(scatterObj, graphObj) {
    if (scatterObj.scatterRadius == undefined) {
        scatterObj.scatterRadius = defaultScatterRadius;
    }
    scatterObj.isScatter = true;
    return new Bubble(scatterObj, graphObj);
}
