let angle = {
  deg: 1,
  rad: 0.0174533,
  grd: 1.1111111111111112,
  mr: 17.4533,
  sec: 3600,
  min: 60,
  rev: 0.00277778,
};

let area = {
  m: 1,
  km: 0.000001,
  inch: 1550,
  f: 10.7639,
  h: 0.0001,
  acre: 0.000247105,
  ares: 0.01,
};

let data = {
  bi: 8,
  mbi: 0.000008,
  kbi: 0.008,
  gbi: 0.00000008,
  b: 1,
  mb: 0.000001,
  kb: 0.001,
  gb: 0.00000001,
  tb: 0.000000000001,
};

let force = {
  n: 1,
  jc: 100,
  mn: 0.000001,
  tf: 0.0001019716,
  kn: 0.001,
  pf: 0.2248089431,
  kf: 0.1019716213,
  gf: 101.9716213,
};

let length = {
  m: 1,
  cm: 100,
  km: 0.001,
  mm: 1000,
  mile: 0.0006213712,
  inch: 39.37007874,
  foot: 3.280839895,
  hm: 0.01,
  dm: 10,
  a: 10000000000,
  nmile: 0.0005399568,
  y: 1.0936132983,
  ly: 1.057000834e-16,
  ps: 3.2407792896664e-17,
};

let mass = {
  kg: 1,
  g: 1000,
  mg: 1000000,
  t: 0.0011023113,
  o: 35.27396195,
  p: 2.2046226218,
};

let speed = {
  ms: 1,
  mis: 0.0006213712,
  kms: 0.001,
  mh: 3600,
  mih: 2.2369362921,
  kmh: 3.6,
  mm: 60,
  mim: 0.0372822715,
  kmm: 0.06,
  k: 1.9438444924,
  m: 0.0033892974,
};

let temperature = {
  c: 1,
  k: 274.15,
  f: 33.8,
  r: 0.8,
};

let volume = {
  l: 1,
  cm: 0.001,
  ml: 1000,
  cmm: 1000000,
  g: 0.2641720524,
  cf: 0.0353146667,
  ci: 61.023744095,
};

let work = {
  hp: 0.0013410221,
  w: 1,
  miw: 1000,
  kw: 0.001,
  mw: 0.000001,
  gw: 0.000000001,
  kcs: 0.0002388459,
};

let time = {
  min: 60,
  sec: 3600,
  hr: 1,
  d: 1 / 24,
  w: 1 / (24 * 7),
  ms: 3600000,
  ns: 3600000000000,
};

let numSys = {
  deci: 10,
  bi: 2,
  oct: 8,
  hex: 16,
};

export const convertAngle = (val, from, to) => {
  let ans = val * (angle[to] / angle[from]);
  return ans;
};

export const convertArea = (val, from, to) => {
  let ans = val * (area[to] / area[from]);
  return ans;
};

export const convertData = (val, from, to) => {
  let ans = val * (data[to] / data[from]);
  return ans;
};

export const convertForce = (val, from, to) => {
  let ans = val * (force[to] / force[from]);
  return ans;
};

export const convertLength = (val, from, to) => {
  let ans = val * (length[to] / length[from]);
  return ans;
};

export const convertMass = (val, from, to) => {
  let ans = val * (mass[to] / mass[from]);
  return ans;
};

export const convertSpeed = (val, from, to) => {
  let ans = val * (speed[to] / speed[from]);
  return ans;
};

export const convertTemperature = (val, from, to) => {
  let ans = val * (temperature[to] / temperature[from]);
  return ans;
};

export const convertVolume = (val, from, to) => {
  let ans = val * (volume[to] / volume[from]);
  return ans;
};

export const convertWork = (val, from, to) => {
  let ans = val * (work[to] / work[from]);
  return ans;
};

export const convertTime = (val, from, to) => {
  let ans = val * (time[to] / time[from]);
  return ans;
};

export const checkNumSys = (val, sys) => {
  if (sys === "deci") {
    return (
      !isNaN(parseInt(val, 10)) &&
      parseInt(val, 10).toString(10) === Number(val).toString()
    );
  } else if (sys === "bi") {
    return (
      !isNaN(parseInt(val, 2)) &&
      parseInt(val, 2).toString(2) === Number(val).toString()
    );
  } else if (sys === "oct") {
    return (
      !isNaN(parseInt(val, 8)) &&
      parseInt(val, 8).toString(8) === Number(val).toString()
    );
  } else {
    return (
      !isNaN(parseInt(val, 16)) &&
      parseInt(val, 16).toString() === Number("0x" + val).toString()
    );
  }
};

export const convertNumSys = (val, from, to) => {
  return parseInt(val, numSys[from]).toString(numSys[to]);
};
