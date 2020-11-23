require('dotenv-flow').config();
const path = require('path');
const convertKebabCase = require('lodash/kebabCase');
const rootPath = path.resolve(__dirname, './');
const isProduction = process.env.NODE_ENV === `production`;
const { APIKEY, DEVICETYPE, PARTNER, REGION } = process.env;
const { colorSet } = require('./css-variables');

export default {
  ssr: true,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  env: {
    APIKEY,
    DEVICETYPE,
    PARTNER,
    REGION,
  },
  head: {
    title: 'POOQ A11Y SAMPLE - Vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    middleware: [],
    extendRoutes(routes, resolve) {
      routes.forEach(route => {
        route.path =
          route.path &&
          route.path
            .split('/')
            .map(path => {
              if (path.startsWith(':')) return path;
              return convertKebabCase(path);
            })
            .join('/');
      });
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/index.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-fragment.js',
    '~/plugins/axios.js',
    '~/plugins/vue-fontawesome.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: isProduction,
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ];
      },
    },
    postcss: {
      plugins: {
        cssnano: {},
      },
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
    cssSourceMap: true,
    optimization: {
      minimize: true,
    },
    extend(config, ctx) {
      const alias = (config.resolve.alias = config.resolve.alias || {});

      alias[`@assets`] = path.join(rootPath, './assets');
      alias[`~assets`] = path.join(rootPath, './assets');
      alias[`@images`] = path.join(rootPath, './assets/images');
      alias[`@atoms`] = path.join(rootPath, './components/atoms');
      alias[`@molecules`] = path.join(rootPath, './components/molecules');
      alias[`@organisms`] = path.join(rootPath, './components/organisms');
      alias[`@templates`] = path.join(rootPath, './components/templates');
    },
  },
  styleResources: {
    scss: [
      '@/assets/scss/modules/_iconfonts.scss',
      '@/assets/scss/modules/_variables.scss',
      '@/assets/scss/helpers/_functions.scss',
      '@/assets/scss/helpers/_mixins.scss',
      '@/assets/scss/partials/_element.scss',
    ],
  },
  storybook: {
    stories: [
      path.join(rootPath, `./components/**/*.stories.@(js|jsx|ts|tsx|mdx)`),
      path.join(rootPath, `./pages/**/*.stories.@(js|jsx|ts|tsx|mdx)`),
    ],
    addons: [
      `@storybook/addon-links`,
      `@storybook/addon-essentials`,
      `@storybook/addon-a11y`,
    ],
    parameters: {
      controls: { expanded: true },
      backgrounds: {
        default: 'content',
        values: [
          {
            name: `header`,
            value: colorSet.grey.darken,
          },
          {
            name: 'content',
            value: colorSet.grey.light,
          },
          {
            name: 'footer',
            value: colorSet.grey.light,
          },
        ],
      },
    },
    webpackFinal: config => {
      config.resolve.alias[`@`] = rootPath;
      config.resolve.alias[`~`] = rootPath;
      config.resolve.alias[`@atoms`] = path.join(
        rootPath,
        './components/atoms',
      );
      config.resolve.alias[`@molecules`] = path.join(
        rootPath,
        './components/molecules',
      );
      config.resolve.alias[`@organisms`] = path.join(
        rootPath,
        './components/organisms',
      );
      config.resolve.alias[`@templates`] = path.join(
        rootPath,
        './components/templates',
      );

      return config;
    },
  },
};
