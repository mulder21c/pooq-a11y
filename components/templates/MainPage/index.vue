<template>
  <fragment>
    <recommend-banner
      v-if="recommendBannerList.length"
      :banner-items="recommendBannerList"
    >
      <template v-slot:[`heading`]="props">
        <Heading
          :id="props.id"
          :rank="2"
          :text-content="`추천 콘텐츠`"
          :is-hidden="true"
        />
      </template>
    </recommend-banner>
    <ContentBand
      :heading-rank="2"
      :heading-content="`인기 방송 VOD`"
      :content-list="popVods"
      :context="`vod`"
    />
    <ContentBand
      :heading-rank="2"
      :heading-content="`인기 실시간 TV`"
      :content-list="popLives"
      :context="`live`"
    />
  </fragment>
</template>

<script>
import RecommendBanner from '@organisms/Banner/Recommend';
import ContentBand from '@organisms/ContentBand';
import Heading from '@atoms/Heading';

export default {
  components: {
    RecommendBanner,
    ContentBand,
    Heading,
  },
  props: {
    recommendBannerList: {
      type: Array,
      required: false,
      default: () => [],
    },
    popVods: {
      type: Array,
      required: false,
      default: () => [],
    },
    popLives: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" modules src="./index.scss"></style>
