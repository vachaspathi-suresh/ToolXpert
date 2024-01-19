// prettier-ignore
let special = ['\n',',','.',' ','~','!','@','#','$','%','^','&','*','(',')','-','_','+','=','{','}','[',']','\\','|',':',';','"','\'','<','>','?','/','`'];
export const countWords = (text) => {
  let words = text.split(/[\n,\s.]/);
  words = words.filter((i) => i.trim() !== "");
  return words.length;
};

export const countLines = (text) => {
  let lines = text.split("\n");
  lines = lines.filter((i) => i.trim() !== "");
  return lines.length;
};

export const countSpaces = (text) => {
  return text.split(" ").length - 1;
};

export const countChar = (text) => {
  return text.length;
};

export const toCamelCase = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words
    .map((word, i) => {
      word = word.toLowerCase();
      if (i === 0) return word;
      else return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
  return ans;
};

export const toPascalCase = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words
    .map((word, i) => {
      word = word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
  return ans;
};

export const toTitleCase = (text) => {
  let ans = "";
  let setCap = true;
  [...text].forEach((i) => {
    if (setCap) {
      ans += i.toUpperCase();
      setCap = false;
    } else {
      ans += i;
    }
    if (special.includes(i)) {
      setCap = true;
    }
  });
  return ans;
};

export const toSnakeCase = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words
    .map((word, i) => {
      return word.toLowerCase();
    })
    .join("_");
  return ans;
};

export const toKebabCase = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words
    .map((word, i) => {
      return word.toLowerCase();
    })
    .join("-");
  return ans;
};

export const invertCase = (text) => {
  let ans = "";
  [...text].forEach((i) => {
    if (i !== i.toLowerCase()) ans += i.toLowerCase();
    else if (i !== i.toUpperCase()) ans += i.toUpperCase();
    else ans += i;
  });
  return ans;
};

export const toDotCase = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words
    .map((word, i) => {
      return word.toLowerCase();
    })
    .join(".");
  return ans;
};

export const sortWords = (text) => {
  let words = text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words.sort();
  return ans.join(" ");
};

export const removeDuplicates = (text) => {
  let uniqueWords = new Set(text.split(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/));
  let ans = "";
  text.split(/[\n\s]/).forEach((word) => {
    let temp = word.replaceAll(/[\n,\s.@#$%&*_!+~^:;\-<>?'"]/g, "");
    if (uniqueWords.has(temp)) {
      uniqueWords.delete(temp);
      ans += " " + word;
    }
  });
  return ans.trim();
};

export const indexLines = (text) => {
  let lines = text.split(/[\n.]/);
  lines = lines.filter((i) => i.trim() !== "");
  let ans = "";
  lines.forEach((line, i) => {
    ans += i + 1 + ". " + line.trim() + ".\n";
  });
  return ans.trim();
};

export const reverseWords = (text) => {
  let words = text.split(/[\n\s]/);
  words = words.filter((i) => i.trim() !== "");
  let ans = words.reverse().join(" ");
  return ans;
};

export const reverseText = (text) => {
  let words = text.split("");
  let ans = words.reverse().join("");
  return ans;
};
