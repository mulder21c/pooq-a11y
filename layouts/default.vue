<template>
  <fragment>
    <AppHeader
      :class="`app__header`"
      :navigations="navigations"
      :sub-navigations="subNavigations"
    />
    <Nuxt :class="`app__content`" />
    <AppFooter :class="`app__footer`" />
  </fragment>
</template>

<script>
import AppHeader from '@organisms/AppHeader';
import AppFooter from '@organisms/AppFooter';
import { mapState } from 'vuex';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapState(`common`, [`navigations`, `subNavigations`, `footNavigations`]),
  },
};
</script>

<style lang="scss" src="./default.scss"></style>
