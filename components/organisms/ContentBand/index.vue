<template>
  <div :class="$style[`contents-band`]">
    <Heading
      :id="`contents-band-${_uid}`"
      :rank="headingRank"
      :text-content="headingTitle"
      :class="$style[`contents-band__heading`]"
    />
    <client-only>
      <slider
        :aria-labelledby="`contents-band-${_uid}`"
        :class="[
          $style[`contents-band__carousel`],
          $style[`contents-band__carousel--${context}`],
        ]"
        :animation="`normal`"
        :auto-play="true"
        :speed="700"
        :interval="5000"
        :use-control-btn="true"
        :use-indicator="false"
        :use-status="true"
        :list="contentList"
      >
        <slider-item
          v-for="(itemSet, idx) in sliderList"
          :key="`vod-${idx}`"
          :aria-label="`${idx + 1}번째 슬라이드`"
          :class="$style[`contents-band__carousel__set`]"
        >
          <ContentCard
            v-for="{ id, title, img, broadcaster, date, episode } in itemSet"
            :key="`vod-band-set-${id}`"
            :content-id="id"
            :img="img"
            :title="title"
            :broadcaster="broadcaster"
            :date="date"
            :episode="episode"
            :context="context"
            :class="$style[`contents-band__carousel__item`]"
          />
        </slider-item>
      </slider>
    </client-only>
  </div>
</template>

<script>
import Heading from '@atoms/Heading';
// import { Slider, SliderItem } from '@molecules/Carousel/index';
import Slider from '@molecules/Carousel/Slider.vue';
import SliderItem from '@molecules/Carousel/SliderItem.vue';
import ContentCard from '@molecules/ContentCard';
import slice from 'lodash/slice';
export default {
  components: {
    Heading,
    Slider,
    SliderItem,
    ContentCard,
  },
  props: {
    contentList: {
      type: Array,
      required: false,
      default: () => [],
    },
    headingRank: {
      type: Number,
      required: false,
      default: 2,
    },
    headingTitle: {
      type: String,
      required: false,
      default: ``,
    },
    context: {
      type: String,
      required: false,
      default: `vod`,
    },
  },
  computed: {
    sliderList() {
      const arr = [];
      for (
        let i = 0, item;
        (item = slice(this.contentList, i * 4, ++i * 4));

      ) {
        if (!item.length) return arr;
        arr.push(item);
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
