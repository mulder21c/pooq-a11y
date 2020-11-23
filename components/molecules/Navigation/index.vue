<template>
  <div
    :role="`navigation`"
    :aria-labelledby="navHeadingId"
    :class="$style[`nav`]"
  >
    <slot :id="navHeadingId" name="nav-heading" />
    <Heading
      v-if="!hasHeadingSlot"
      :id="navHeadingId"
      :rank="headingRank"
      :html="headingContent"
      :is-hidden="hideHeading"
    />

    <div
      :class="[
        $style[`nav__list`],
        $style[`nav__list--${flow}`],
        context ? $style[`nav__list--${context}`] : ``,
      ]"
    >
      <Link
        v-for="({ to, href, target, content }, index) in paths"
        :key="`nav-${_uid}-${index}`"
        :to="to"
        :href="href"
        :traget="target"
        :content="content"
        :class="[$style[`nav__list__item`], itemClassName]"
      />
    </div>
  </div>
</template>

<script>
import Link from '@atoms/Link';
import Heading from '@atoms/Heading';

export default {
  components: {
    Link,
    Heading,
  },
  props: {
    paths: {
      type: Array,
      required: true,
      default: () => [],
    },
    flow: {
      type: String,
      required: false,
      default: `row`,
      validator: val => {
        return [`row`, `column`].includes(val);
      },
    },
    context: {
      type: String,
      required: false,
      default: ``,
    },
    itemClassName: {
      type: String,
      required: false,
      default: ``,
    },
    headingId: {
      type: String,
      required: false,
      default: `nav`,
    },
    headingRank: {
      type: Number,
      required: false,
      default: 1,
    },
    headingContent: {
      type: String,
      required: false,
      default: ``,
    },
    hideHeading: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    hasHeadingSlot() {
      return !!this.$slots[`nav-heading`] || !!this.$scopedSlots[`nav-heading`];
    },
    navHeadingId() {
      return `${this.headingId}-${this._uid}`;
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
