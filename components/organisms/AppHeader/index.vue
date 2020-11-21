<template>
  <div role="banner" :class="$style[`header`]">
    <heading :rank="1" :is-hidden="false" :class="$style[`header__logo`]">
      <nuxt-link :to="`/`">
        <Logo />
      </nuxt-link>
    </heading>
    <navi
      :class="$style[`header__main-nav`]"
      :flow="`row`"
      :context="`primary`"
      :paths="navigations"
      :heading-id="`main-nav-heading`"
      :heading-rank="2"
      :item-class-name="$style[`header__main-nav__item`]"
    >
      <template v-slot:[`nav-heading`]="props">
        <heading
          :id="props.id"
          :rank="2"
          :is-hidden="true"
          :text-content="`메인`"
        />
      </template>
    </navi>
    <form
      action="/"
      method="get"
      :class="$style[`header__search__wrap`]"
      @submit.prevent="handleSearch"
    >
      콤보박스
    </form>
    <navi
      :class="$style[`header__util-nav`]"
      :flow="`row`"
      :context="`sub`"
      :paths="subNavigations"
      :heading-id="`util-nav-heading`"
      :heading-rank="2"
      :item-class-name="$style[`header__util-nav__item`]"
    >
      <template v-slot:[`nav-heading`]="props">
        <heading
          :id="props.id"
          :rank="2"
          :is-hidden="true"
          :text-content="`유틸`"
        />
      </template>
    </navi>
  </div>
</template>

<script>
import Heading from '@atoms/Heading';
import Logo from '@atoms/Logo';
import Navi from '@molecules/Navigation';

export default {
  components: {
    Heading,
    Logo,
    Navi,
  },
  props: {
    navigations: {
      type: Array,
      required: false,
      default: () => [],
    },
    subNavigations: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    handleSearch() {},
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
