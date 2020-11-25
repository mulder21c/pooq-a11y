<template>
  <transition
    :name="
      initAnimation ? `` : `--${animation}--${direction ? 'left' : 'right'}-`
    "
  >
    <div
      v-show="display"
      v-bind="$attrs"
      role="tabpanel"
      :aria-hidden="(!display).toString()"
      :tabindex="display ? `0` : `-1`"
      :class="$style[`slider-item`]"
      :style="{ zIndex, transition: `all ${speed / 1000}s` }"
      v-on="$listeners"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      display: false,
      isInit: false,
      initAnimation: false,
      direction: false,
      animation: 'normal',
      speed: 500,
      zIndex: 9,
    };
  },
  created() {
    this.$parent.$emit('slider:init');
    this.speed = this.$parent.speed || 500;
    this.animation = this.$parent.animation || 'normal';
  },
  destroyed() {
    this.$parent.$emit('slider:init');
  },
  methods: {
    init() {
      if (this.isInit) return;

      this.isInit = true;
      this.display = true;
      this.initAnimation = true;
      this.zIndex = 10;
      this.$nextTick(() => {
        this.initAnimation = false;
      });
    },
    show(direction) {
      this.zIndex = 10;
      this.direction = direction;
      this.$nextTick(() => (this.display = true));
    },
    hide(direction) {
      this.zIndex = 9;
      this.direction = direction;
      this.$nextTick(() => (this.display = false));
    },
  },
};
</script>

<style lang="scss" module src="./SliderItem.scss"></style>
<style lang="scss">
.--normal {
  &--left {
    &--enter {
      transform: translateX(100%);
    }
    &--leave-to {
      transform: translateX(-100%);
    }
  }
  &--right {
    &--enter {
      transform: translateX(-100%);
    }
    &--leave-to {
      transform: translateX(100%);
    }
  }
}

.--fade {
  &--left {
    &--enter,
    &--leave-to {
      opacity: 0;
    }
  }
  &--right {
    &--enter,
    &--leave-to {
      opacity: 0;
    }
  }
}
</style>
