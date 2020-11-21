import Vuex from 'vuex';
import main from '@/store';
import common from '@/store/common';

const store = new Vuex.Store({
  ...main,
  modules: {
    common: {
      namespaced: true,
      ...common,
    }
  }
});

if (store._actions && store._actions.nuxtServerInit) {
  try {
    (async () => {
      await store.dispatch(`nuxtServerInit`);
    })();
  } catch (err) {
    throw err;
  }
}

export default store;