/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const reduce = require('lodash/reduce');
const reduceRight = require('lodash/reduceRight');
const kebabCase = require('lodash/kebabCase');
const data = require('./css-variables');
const outputPath = path.resolve(__dirname, './assets/scss/modules');
const filename = '_variables.scss';

const jsonToSCSS = data => {
  if (!data) {
    return '';
  }

  const getSCSS = entry => {
    if (Array.isArray(entry)) {
      const temp = reduceRight(
        entry,
        (acc, val) => {
          return `${getSCSS(val)},` + acc;
        },
        '',
      ).replace(/,(\s|\S)?$/g, '');
      return `(${temp})`;
    } else if (entry instanceof Object) {
      const temp = reduceRight(
        entry,
        (acc, val, key) => {
          return `'${key}': ${getSCSS(val)},` + acc;
        },
        '',
      ).replace(/,(\s|\S)?$/g, '');
      return `(${temp})`;
    } else {
      return entry;
    }
  };

  return reduce(
    data,
    (scss, value, key) => {
      scss += `$${kebabCase(key)}: `;
      scss += getSCSS(value);
      scss += ';\n';
      return scss;
    },
    '',
  );
};

const scss = jsonToSCSS(data);

try {
  fs.writeFileSync(path.resolve(outputPath, filename), scss, 'utf8');
  console.log('Converting completed successful!');
} catch (err) {
  throw new Error(err);
}
