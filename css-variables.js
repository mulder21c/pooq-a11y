const text = {
  size: {
    xsmall: '12px',
    small: '14px',
    base: '16px',
    large: '18px',
    xlarge: '20px',
    xzlarge: '40px',
    big: '100px',
  },
  weight: {
    thin: 200,
    light: 300,
    regular: 400,
    bold: 600,
    exbold: 800,
  },
};
const colorSet = {
  grey: {
    primary: {
      default: '#a553ff',
      deep: '#8135c9',
    },
    grey: {
      default: '#ddd',
      light: '#fefefe',
      dark: '0a0a0a',
    },
    white: {
      default: '#fff',
    },
    black: {
      default: '#000',
    },
  },
}
const webFontPath = "'/fonts/'";
const webFonts = {
  NotoSansKR: {
    files: {
      thin: "'NotoSansKR-Thin'",
      light: "'NotoSansKR-Light'",
      regular: "'NotoSansKR-Regular'",
      bold: "'NotoSansKR-Bold'",
      exbold: "'NotoSansKR-Extra-Bold'",
    },
    exts: ["'woff2'", "'woff'", "'eot'"],
  },
};
const noto = "'NotoSansKR'";

module.exports = {
  text,
  webFontPath,
  webFonts,
  noto,
};
