const txt_mc = {
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-",
};

var mc_txt = {};
for (var key in txt_mc) {
  mc_txt[txt_mc[key]] = key;
}

export const textToMorse = (text) => {
  text = text.toLowerCase().replace("/[\n~`#$%^&*_+=|\\}]{[:;\"'<>]/", "");
  let ans = "";
  text.split("").forEach((i) => {
    if (i === "") return;
    if (i === " ") ans += "    ";
    else ans += txt_mc[i] + " ";
  });
  return ans;
};

export const morseToText = (code) => {
  code = code.trim().split(" ");
  let ans = "";
  let c = 0;
  code.forEach((i) => {
    if (c === 4) {
      ans += " ";
      c = 0;
    }
    if (i === "") c++;
    else {
      ans += !mc_txt[i] ? "?" : mc_txt[i];
      c = 0;
    }
  });
  return ans;
};
