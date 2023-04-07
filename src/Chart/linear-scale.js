
const math = Math;

export default function LinearScale(minPoint, maxPoint, maxTicks, stepSize) {
  const result = [];
  let lBound, uBound;

  if (stepSize > 0) {
    lBound = minPoint;
    uBound = maxPoint;
  }
  else {
    const range = niceNum(maxPoint - minPoint, false);
    stepSize = niceNum(range / (maxTicks - 1), true);
    lBound = math.floor(minPoint / stepSize) * stepSize;
    uBound = math.ceil(maxPoint / stepSize) * stepSize;
  }

  var count = math.ceil((uBound - lBound) / stepSize);
  for(let i=0; i<=count; i++) {
    result.push(lBound + (i * stepSize));
  }
  result.reverse();

  return {
    min: lBound,
    max: result[0],
    scale: result,
    step: stepSize
  };
}

function niceNum(localRange, round) {
  var exponent = math.floor(math.log10(localRange)),
    fraction = localRange / math.pow(10, exponent),
    niceFraction;

  if (round) {
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
  } else {
      if (fraction <= 1) niceFraction = 1;
      else if (fraction <= 2) niceFraction = 2;
      else if (fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
  }
  return niceFraction * math.pow(10, exponent);
}
