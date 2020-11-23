<template>
  <div :class="[$style[`palette`], color ? $style[`palette${color}`] : '']">
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div :class="$style[`rect-angles`]">
      <div :class="[$style[`rect-angle`], $style[`rect-angle--small`]]" />
      <div :class="[$style[`rect-angle`], $style[`rect-angle--medium`]]" />
      <div :class="[$style[`rect-angle`], $style[`rect-angle--large`]]" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
