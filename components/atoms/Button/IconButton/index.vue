<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="label"
    :class="[
      $style[`btn`],
      $style[`btn--${appearance}`],
      $style[`btn--${size}`],
      circled && $style[`btn--circled`],
      isRoundEdge && $style[`btn--round-edge`],
    ]"
    :style="{ opacity: opacity !== 1 ? opacity : null }"
  >
    <slot name="button-icon" />
    <span
      v-if="!hasIconSlot"
      aria-hidden="true"
      :class="[$style[`btn--icon`], $style[`btn--icon--${icon}`]]"
    />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: `button`,
      validator(val) {
        return [`button`, `submit`, `reset`].includes(val);
      },
    },
    disabled: {
      type: Boolean,
      requried: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: ``,
    },
    icon: {
      type: String,
      reqruied: false,
      default: ``,
    },
    appearance: {
      type: String,
      required: true,
      default: `none`,
      validator(val) {
        return [`none`, `outline`, `primary`, `primary-outline`].includes(val);
      },
    },
    size: {
      type: String,
      required: false,
      default: `normal`,
      validator(val) {
        return [
          `small`,
          `normal`,
          `normal--half-horizonal`,
          `normal--half-vertical`,
          `large`,
          `large--half-horizonal`,
          `large--half-vertical`,
        ].includes(val);
      },
    },
    isRoundEdge: {
      type: Boolean,
      required: false,
      default: false,
    },
    circled: {
      type: Boolean,
      required: false,
      default: false,
    },
    opacity: {
      type: Number,
      required: false,
      default: 1,
      validator(val) {
        return val >= 0 && val <= 1;
      },
    },
  },
  computed: {
    hasIconSlot() {
      return !!this.$slots[`button-icon`] || !!this.$scopedSlots[`button-icon`];
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
