<template>
  <MainPageTpl :recommend-banner-list="recommendBanner" />
</template>

<script>
import MainPageTpl from '@templates/MainPage';

export default {
  components: {
    MainPageTpl,
  },
  async asyncData({ app }) {
    const [recommendBanner] = await Promise.all([
      app.$api.banner.getRecommendBanner(),
    ]);

    return {
      recommendBanner,
    };
  },
};
</script>
