import Line from "./line";

const defaultPointRadius = 0;

export default function Area(areaObj, graphObj) {
    if (areaObj.pointRadius === undefined) {
        areaObj.pointRadius = defaultPointRadius;
    }
    areaObj.isArea = true;
    return new Line(areaObj, graphObj);
}
