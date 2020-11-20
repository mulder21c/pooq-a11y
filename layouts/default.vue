<template>
  <fragment>
    <AppHeader :class="`app__header`" />
    <Nuxt :class="`app__content`" />
    <AppFooter :class="`app__footer`" />
  </fragment>
</template>

<script>
import AppHeader from '@organisms/AppHeader';
import AppFooter from '@organisms/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" src="./default.scss"></style>
