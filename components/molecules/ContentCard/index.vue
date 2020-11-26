<template>
  <nuxt-link
    :to="`#`"
    :class="$style[`card`]"
    :aria-labelledby="`card-${_uid}`"
  >
    <img
      :role="`none`"
      :src="img"
      alt=""
      :class="$style[`card__info__thumbs`]"
    />
    <template v-if="isVodContext">
      <div :id="`card-${_uid}`" :class="$style[`card__info`]">
        <span :class="$style[`card__info__subject`]">
          <span :class="$style[`card__info__subject__title`]">{{ title }}</span>
          <span :class="$style[`card__info__subject__episode`]">
            {{ episode }}회
          </span>
        </span>
        <span :class="$style[`card__info__desc`]">
          <span
            :class="$style[`card__info__desc__date`]"
            :aria-label="formattedDate"
          >
            {{ date }}
          </span>
          <span :class="$style[`card__info__desc__broad`]">
            {{ broadcaster }}
          </span>
        </span>
      </div>
    </template>
    <template v-else-if="isLiveContext">
      <div :id="`card-${_uid}`" :class="$style[`card__info`]">
        <span :class="$style[`card__info__subject`]">
          <span :class="$style[`card__info__subject__title`]">{{ title }}</span>
        </span>
        <span :class="$style[`card__info__desc`]">
          <span :class="$style[`card__info__desc__broad`]">
            {{ broadcaster }}
          </span>
        </span>
      </div>
    </template>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    contentId: {
      type: [String, Number],
      required: true,
      default: ``,
    },
    img: {
      type: String,
      required: true,
      default: ``,
    },
    title: {
      type: String,
      required: true,
      default: ``,
    },
    broadcaster: {
      type: String,
      required: true,
      default: ``,
    },
    date: {
      type: String,
      required: false,
      default: ``,
    },
    episode: {
      type: [String, Number],
      required: false,
      default: ``,
    },
    context: {
      type: String,
      required: true,
      default: `vod`,
    },
  },
  computed: {
    formattedDate() {
      return this.context === 'vod'
        ? this.$dayjs(this.date).format(`YYYY년 MM월 DD일`)
        : this.date;
    },
    isVodContext() {
      return this.context === 'vod';
    },
    isLiveContext() {
      return this.context === 'live';
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
