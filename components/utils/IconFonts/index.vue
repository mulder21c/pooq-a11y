<template>
  <div>
    <span :class="[$style[`icon-${fontName}`], $style[`size-1x`]]"></span>
    <span :class="[$style[`icon-${fontName}`], $style[`size-2x`]]"></span>
    <span :class="[$style[`icon-${fontName}`], $style[`size-3x`]]"></span>
    <span :class="[$style[`icon-${fontName}`], $style[`size-4x`]]"></span>
    <span :class="[$style[`icon-${fontName}`], $style[`size-5x`]]"></span>
    <span :class="[$style[`icon-${fontName}`], $style[`size-6x`]]"></span>
  </div>
</template>

<script>
export default {
  props: {
    fontName: {
      type: String,
      required: false,
      default: ``,
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
