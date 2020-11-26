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
    <div>인기 방송 VOD 캐러셀 영역 - paging, non-indicator</div>
    <div>인기 실시간 TV 캐러셀 영역 - paging, non-indicator</div>
  </fragment>
</template>

<script>
import RecommendBanner from '@organisms/Banner/Recommend';
import Heading from '@atoms/Heading';

export default {
  components: {
    RecommendBanner,
    Heading,
  },
  props: {
    recommendBannerList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" modules src="./index.scss"></style>
