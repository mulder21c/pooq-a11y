/* eslint-disable no-console */
const fs = require(`fs`);
const path = require(`path`);
const webfontsGenerator = require(`webfonts-generator`);

const getFileList = () => {
  return new Promise(resolve => {
    fs.readdir('./assets/svgIcons', { withFileTypes: true }, (err, files) => {
      if (err) {
        throw new Error(err);
      }

      const list = files
        .filter(item => !item.isDirectory() && item.name.includes(`svg`))
        .map(item => item.name);
      resolve(list);
    });
  });
};

(async () => {
  const files = await getFileList();

  const iconList = files.map(item => item.replace('.svg', ``));
  fs.writeFile(
    `./assets/svgIcons/fonts.json`,
    JSON.stringify(iconList),
    'utf-8',
    err => {
      if (err) throw new Error(err);
    },
  );

  webfontsGenerator(
    {
      files: files.map(item => `./assets/svgIcons/${item}`),
      dest: `./static/iconfonts/`,
      fontName: `iconfont`,
      cssTemplate: './generate-iconfonts.hbs',
      cssDest: path.join(`./assets/scss/modules/_iconfonts.scss`),
      cssFontsUrl: `/iconfonts/`,
    },
    err => {
      if (err) {
        console.log(`Failed to generate icon fonts`, err);
      } else {
        console.log(`Generating iconfonts completed successful!`);
      }
    },
  );
})();
