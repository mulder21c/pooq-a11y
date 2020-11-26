<template>
  <MainPageTpl
    :recommend-banner-list="recommendBanner"
    :pop-vods="popVods"
    :pop-lives="popLives"
  />
</template>

<script>
import MainPageTpl from '@templates/MainPage';

export default {
  components: {
    MainPageTpl,
  },
  async asyncData({ app }) {
    const [recommendBanner, popVods, popLives] = await Promise.all([
      app.$api.banner.getRecommendBanner(),
      app.$api.home.getPopVods(),
      app.$api.home.getPopLives(),
    ]);

    return {
      recommendBanner,
      popVods,
      popLives,
    };
  },
};
</script>
