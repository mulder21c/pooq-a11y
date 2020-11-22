import Vue from 'vue';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSearch,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
library.add([faSearch, faAngleRight, faAngleLeft]);

Vue.use(Vuex);

Vue.component(`nuxt-link`, {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  template: `<a :href="to"><slot /></a>`,
});

Vue.component(`nuxt`, {
  template: `<router-view />`,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
