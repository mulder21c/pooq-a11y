<template>
  <div :class="$style[`recommend`]">
    <slot :id="`recommend-${_uid}`" name="heading" />
    <Heading
      v-if="!hasHeadingSlot"
      :id="`recommend-${_uid}`"
      :rank="headingRank"
      :html="headingContent"
      :is-hidden="hideHeading"
    />
    <client-only>
      <slider
        :aria-labelledby="`recommend-${_uid}`"
        :class="$style[`recommend__carousel`]"
        :animation="`fade`"
        :auto-play="true"
        :speed="700"
        :use-control-btn="true"
        :use-indicator="true"
        :list="bannerItems"
      >
        <slider-item
          v-for="{ id, img, title, description } in bannerItems"
          :key="id"
          :aria-labelledby="`recommend-${id}`"
          :class="$style[`recommend__carousel__item`]"
        >
          <nuxt-link
            :to="`#`"
            :aria-labelledby="`recommend-${id}`"
            :aria-describedby="`recommend-${id}-desc`"
          >
            <img
              :id="`recommend-${id}`"
              :src="img"
              :alt="title"
              :class="$style[`recommend__carousel__item__img`]"
            />
            <p :id="`recommend-${id}-desc`" :class="$style[`--sr-only`]">
              {{ description }}
            </p>
          </nuxt-link>
        </slider-item>
      </slider>
    </client-only>
  </div>
</template>

<script>
// import { Slider, SliderItem } from '@molecules/Carousel/index.js';
import Slider from '@molecules/Carousel/Slider.vue';
import SliderItem from '@molecules/Carousel/SliderItem.vue';
import Heading from '@atoms/Heading';

export default {
  components: {
    Slider,
    SliderItem,
    Heading,
  },
  props: {
    bannerItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    headingRank: {
      type: Number,
      required: false,
      default: 2,
    },
    headingContent: {
      type: String,
      required: false,
      default: `추천 콘텐츠`,
    },
    hideHeading: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    hasHeadingSlot() {
      return !!this.$slots.heading || !!this.$scopedSlots.heading;
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
