<template>
  <fragment>
    <AppHeader
      :class="`app__header`"
      :navigations="navigations"
      :sub-navigations="subNavigations"
    />
    <Nuxt :class="`app__content`" />
    <AppFooter
      :class="`app__footer`"
      :foot-notice-list="footNoticeList"
      :navigations="footNavigations"
    />
  </fragment>
</template>

<script>
import AppHeader from '@organisms/AppHeader';
import AppFooter from '@organisms/AppFooter';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  fetch() {
    this.fetchLastestNotice();
  },
  computed: {
    ...mapState(`common`, [
      `navigations`,
      `subNavigations`,
      `footNavigations`,
      `footNoticeList`,
    ]),
  },
  methods: {
    ...mapActions(`common`, [`fetchLastestNotice`]),
  },
};
</script>

<style lang="scss" src="./default.scss"></style>
