<template>
  <div
    ref="carousel"
    role="region"
    aria-roledescription="carousel"
    :class="$style[`carousel__wrapper`]"
    @focusin="handleAutoPlayPauseByKey"
    @focusout="handleAutoPlayResumeByKey"
    @mouseenter="handleAutoPlayPause"
    @mouseleave="handleAutoPlayResume"
  >
    <div
      v-if="useIndicator"
      ref="indicator"
      role="tablist"
      :class="[$style[`carousel__indicator`]]"
      @focusin="adjustIndicatorFocus"
      @keydown.stop.prevent.left="handleKeyDownControl(`prev`)"
      @keydown.stop.prevent.up="handleKeyDownControl(`prev`)"
      @keydown.stop.prevent.right="handleKeyDownControl(`next`)"
      @keydown.stop.prevent.down="handleKeyDownControl(`next`)"
      @keydown.stop.tab="handleGotoPanel"
    >
      <span
        v-for="({ title }, idx) in list"
        ref="indicator-item"
        :key="`indicator-${idx}`"
        role="tab"
        :aria-selected="isActivated(idx).toString()"
        :aria-label="title"
        :tabindex="isActivated(idx) ? `0` : `-1`"
        :class="[
          $style[`carousel__indicator__item`],
          isActivated(idx) ? $style['carousel__indicator__item--active'] : null,
        ]"
        @mousedown="handleClickIndicator(idx - currIdx)"
      />
    </div>
    <template v-if="useStatus">
      <div
        ref="status"
        role="status"
        aria-live="off"
        aria-relevant="additions"
        :class="$style[`carousel__status`]"
      ></div>
    </template>
    <template v-if="useControlBtn">
      <icon-button
        :type="`button`"
        :label="`이전 슬라이드`"
        :appearance="`primary`"
        :size="`normal--half-vertical`"
        :icon="`chevron-left`"
        :class="[$style[`carousel__btn`], $style[`carousel__btn--prev`]]"
        @click.stop.native="handleClickControl(`prev`)"
      />
      <icon-button
        :type="`button`"
        :label="`다음 슬라이드`"
        :appearance="`primary`"
        :size="`normal--half-vertical`"
        :icon="`chevron-right`"
        :class="[$style[`carousel__btn`], $style[`carousel__btn--next`]]"
        @click.stop.native="handleClickControl(`next`)"
      />
    </template>
    <div :class="$style[`carousel`]">
      <slot />
    </div>
  </div>
</template>

<script>
import IconButton from '@atoms/Button/IconButton';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import map from 'lodash/map';

export default {
  components: {
    IconButton,
  },
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    animation: {
      type: String,
      required: false,
      default: `normal`,
    },
    speed: {
      type: Number,
      required: false,
      default: 500,
    },
    autoPlay: {
      type: Boolean,
      required: false,
      default: false,
    },
    interval: {
      type: Number,
      required: false,
      default: 3000,
    },
    useControlBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    btnClassPrev: {
      type: [String, Array],
      required: false,
      default: ``,
    },
    btnClassNext: {
      type: [String, Array],
      required: false,
      default: ``,
    },
    useIndicator: {
      type: Boolean,
      required: false,
      default: false,
    },
    useStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      sliderItems: [],
      currIdx: 0,
      timer: 0,
      isStopped: false,
      hasFocus: false,
    };
  },
  computed: {
    isAutoPlaying() {
      return this.autoPlay && !this.isStopped;
    },
  },
  created() {
    this.init = throttle(this.init, 100);
    this.move = debounce(this.move, this.speed);
    this.$on('slider:init', this.init);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    adjustIndicatorFocus() {
      this.move.cancel();
    },
    init() {
      this.sliderItems = map(this.$slots.default, item => item.child);
      this.currIdx = 0;

      const currItem = this.sliderItems[this.currIdx];
      if (!currItem) return;
      currItem.init();
      this.auto();
    },
    handleClickControl(direction) {
      if (this.sliderItems.length <= 1) return;

      const step = direction === 'next' ? 1 : -1;
      this.move(step);
      this.auto();
    },
    move(step) {
      if (!step || this.sliderItems.length <= 1) return;
      const direction = step > 0;
      const nextIdx = this.getNextIdx(step);
      const currItem = this.sliderItems[this.currIdx];
      const nextItem = this.sliderItems[nextIdx];

      currItem.hide(direction);
      nextItem.show(direction);
      this.currIdx = nextIdx;
      if (this.useStatus) this.setStatus();
      this.$emit('change', nextIdx);
    },
    getNextIdx(step) {
      const len = this.sliderItems.length;

      if (!this.sliderItems[this.currIdx]) {
        this.currIdx = len - 1;
      }
      return (this.currIdx + step + len) % len;
    },
    auto() {
      if (!this.autoPlay || this.isStopped) return;

      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.move(1);
      }, this.interval);
    },
    handleAutoPlayPause() {
      if (this.autoPlay) {
        this.isStopped = true;
        if (this.timer) clearInterval(this.timer);
      }
    },
    handleAutoPlayResume() {
      if (this.autoPlay && !this.checkChildHasFocus()) {
        this.isStopped = false;
        this.auto();
      }
    },
    handleAutoPlayPauseByKey() {
      this.handleAutoPlayPause();
      this.$refs.status &&
        this.$refs.status.setAttribute(`aria-live`, `polite`);
    },
    handleAutoPlayResumeByKey() {
      this.handleAutoPlayResume();
      this.$refs.status && this.$refs.status.setAttribute(`aria-live`, `off`);
    },
    checkChildHasFocus() {
      return this.$refs.carousel.matches(':focus-within');
    },
    handleClickIndicator(step) {
      if (!step || this.sliderItems.length <= 1) return;
      this.move(step);
      this.auto();
    },
    isActivated(idx) {
      return this.currIdx === idx;
    },
    handleKeyDownControl(direction) {
      if (this.sliderItems.length <= 1) return;

      const step = direction === 'next' ? 1 : -1;
      this.move(step);
      setTimeout(() => {
        this.$refs[`indicator-item`][this.currIdx].focus();
        this.auto();
      }, this.speed);
    },
    handleGotoPanel(event) {
      if (!event.shiftKey) {
        event.preventDefault();
        setTimeout(() => {
          this.$slots.default[this.currIdx].elm.focus();
        }, 50);
      }
    },
    setStatus(msg) {
      const el = this.$refs.status;
      const newEl = document.createElement('div');
      newEl.textContent =
        msg || `${this.currIdx + 1}/${this.sliderItems.length} 페이지`;
      el && el.firstElementChild && el.firstElementChild.remove();
      el && el.append(newEl);
    },
  },
};
</script>

<style lang="scss" module src="./Slider.scss"></style>
