<script>
import merge from 'lodash/merge';
import { requiredNoOpener } from '~/plugins/utils';

export default {
  props: {
    to: {
      type: String,
      required: false,
      default: ``,
    },
    href: {
      type: String,
      required: false,
      default: ``,
    },
    target: {
      type: [String, null],
      required: false,
      default: ``,
      validator: value => {
        if (!value) return true;
        if (value.charAt(0) === '_') {
          return [`_blank`, `_self`, `_parent`, `_top`].includes(value);
        }
        return true;
      },
    },
    content: {
      type: String,
      required: false,
      default: ``,
    },
  },
  render(createElement) {
    const contentProp = {
      domProps: {
        innerHTML: this.content,
      },
    };
    const toProp = {
      props: {
        to: this.to,
        exact: true,
      },
    };
    const hrefAttr = {
      attrs: {
        href: this.href || null,
        target: this.target || null,
        rel: requiredNoOpener(this.target) ? `noreferrer noopener` : null,
      },
    };
    const classes = {
      class: {
        link: true,
      },
    };

    return createElement(
      this.to ? `nuxt-link` : `a`,
      merge(
        this.content ? contentProp : null,
        this.to ? toProp : hrefAttr,
        classes,
      ),
      [this.$slots.default],
    );
  },
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
