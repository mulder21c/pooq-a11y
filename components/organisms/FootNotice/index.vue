<template>
  <div
    role="complementary"
    :aria-labelledby="`notice-${_uid}`"
    :class="$style[`notice`]"
  >
    <Heading
      :id="`notice-${_uid}`"
      :rank="headingRank"
      :text-content="`공지사항`"
      :class="$style[`notice__heading`]"
    />
    <div :class="$style[`notice__item`]">
      <nuxt-link
        v-for="{ id: noticeId, content: noticeSubject } in footNoticeList"
        :key="noticeId"
        :to="`#`"
        :class="$style[`notice__content`]"
      >
        {{ noticeSubject }}
      </nuxt-link>
    </div>
    <nuxt-link :to="`#`" :class="$style[`notice__more`]">전체 보기</nuxt-link>
  </div>
</template>

<script>
import Heading from '@atoms/Heading';

export default {
  components: {
    Heading,
  },
  props: {
    headingRank: {
      type: Number,
      required: false,
      default: 2,
    },
    footNoticeList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
