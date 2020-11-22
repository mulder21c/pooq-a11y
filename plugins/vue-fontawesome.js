import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSearch,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

library.add([faSearch, faAngleRight, faAngleLeft]);
Vue.component('font-awesome-icon', FontAwesomeIcon);
