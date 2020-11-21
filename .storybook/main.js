const path = require(`path`);
const rootPath = path.resolve(__dirname, `../`);

module.exports = {
  stories: [
    `../components/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
    `../pages/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ],
  addons: [
    `@storybook/addon-links`,
    `@storybook/addon-essentials`,
    `@storybook/addon-a11y`,
  ],
  webpackFinal: (config) => {
    config.resolve.alias[`@`] = rootPath;
    config.resolve.alias[`~`] = rootPath;
    config.resolve.alias[`@atoms`] = path.join(rootPath, './components/atoms');
    config.resolve.alias[`@molecules`] = path.join(rootPath, './components/molecules');
    config.resolve.alias[`@organisms`] = path.join(rootPath, './components/organisms');
    config.resolve.alias[`@templates`] = path.join(rootPath, './components/templates');

    config.module.rules.push({
      test: /\.scss$/,
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            'style-loader',
            {
              loader: 'css-loader', //not absolute path, so uses root css-loader in package.json
              options: {
                modules: { localIdentName: '[local]_[hash:base64:5]' },
              },
            },
            {
              loader: `sass-loader`,
              options: {
                additionalData: `
                  @import "@/assets/scss/helpers/_functions.scss";
                  @import "@/assets/scss/helpers/_mixins.scss";
                  @import "@/assets/scss/modules/_variables.scss";
                `,
              },
            },
          ]
        },
        {
          use: [
            `style-loader`,
            `css-loader`,
            {
              loader: `sass-loader`,
              options: {
                additionalData: `
                  @import "@/assets/scss/helpers/_functions.scss";
                  @import "@/assets/scss/helpers/_mixins.scss";
                  @import "@/assets/scss/modules/_variables.scss";
                `,
              },
            }
          ],
        },
      ],
      include: path.resolve(__dirname, `../`),
    });

    return config;
  },
};