<script>
import merge from 'lodash/merge';

export default {
  props: {
    rank: {
      type: Number,
      required: true,
      default: 1,
      validator: val => {
        return val >= 1 && val <= 6;
      },
    },
    textContent: {
      type: String,
      required: false,
      default: ``,
    },
    isHidden: {
      type: Boolean,
      required: false,
      default: false,
    },
    html: {
      type: String,
      required: false,
      default: ``,
    },
  },
  render(createElement) {
    return createElement(
      `h${this.rank}`,
      merge(
        {
          class: [
            this.$style.heading,
            this.isHidden ? this.$style['--is-hidden'] : ``,
          ],
        },
        !this.$slots.default && this.html
          ? {
              domProps: {
                innerHTML: this.html,
              },
            }
          : null,
      ),
      this.$slots.default || this.textContent,
    );
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
