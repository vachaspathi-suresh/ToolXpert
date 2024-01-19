export const lightTheme = {
  mode: "light",
  colors: {
    teal: {
      50: "#EEFCFB",
      100: "#ECFDFB",
      150: "#A9DBD9",
      200: "#DEF2F1",
      300: "#A9DBD9",
      500: "#3AAFA9",
      700: "#008C87",
      800: "#006A66",
      900: "#004A47",
    },
    grey: {
      100: "#E8F3F1",
      500: "#95B1AE",
      600: "#718C89",
      700: "#666666",
      800: "#3A3A3A",
      900: "#172F2D",
    },
  },
};
export const darkTheme = {
  mode: "dark",
  colors: {
    teal: {
      50: "#B7BABF",
      100: "#969696",
      150: "#98A3AB",
      200: "#3A3A3A",
      300: "#121212",
      500: "#B0BBB9",
      700: "#008C87",
      800: "#006A66",
      900: "#004A47",
    },
    grey: {
      100: "#E8F3F1",
      500: "#95B1AE",
      600: "#718C89",
      700: "#627C7A",
      800: "#4E6866",
      900: "#DEF2F1",
    },
  },
};

export const florescent = [
  "#FF7200",
  "#0F5EFE",
  "#00E700",
  "#0FF0FC",
  "#BC13FE",
  "#FF3131",
  "#CCFF00",
];

let currTheme = (mode) => {
  return mode === "light" ? lightTheme : darkTheme;
};
export default currTheme;
