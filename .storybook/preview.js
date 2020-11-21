import Vue from 'vue';
import Vuex from 'vuex';
import { colorSet } from '@/css-variables.js';

Vue.use(Vuex);

Vue.component(`nuxt-link`, {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  template: `<a :href="to"><slot /></a>`,
});

Vue.component(`nuxt`, {
  template: `<router-view />`
});

export const parameters = {
  controls: { expanded: true },
  backgrounds: {
    default: 'content',
    values: [
      {
        name: `header`,
        value: colorSet.grey.darken
      },
      {
        name: 'content',
        value: colorSet.grey.light
      },
      {
        name: 'footer',
        value: colorSet.grey.light
      },
    ],
  },
}