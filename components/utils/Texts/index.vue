<template>
  <div>
    <p
      :class="[
        $style[`text-box`],
        fontSize ? $style[`text-box--${fontSize}`] : '',
        fontWeight ? $style[`text-box--${fontWeight}`] : '',
      ]"
    >
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
      default: '',
    },
    fontSize: {
      type: String,
      required: false,
      default: 'base',
    },
    fontWeight: {
      type: String,
      required: false,
      default: 'regular',
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
