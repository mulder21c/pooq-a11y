<template>
  <div
    role="contentinfo"
    :aria-labelledby="`footer-heading`"
    :class="$style[`footer`]"
  >
    <Heading
      :id="`footer-heading`"
      :rank="2"
      :text-content="`회사 소개 및 이용정보`"
      :is-hidden="true"
    />
    <navi
      :class="$style[`footer__nav`]"
      :flow="`row`"
      :context="`footer`"
      :paths="navigations"
      :heading-id="`footer-nav-heading`"
      :item-class-name="$style[`footer__nav__item`]"
    >
      <template v-slot:[`nav-heading`]="props">
        <heading :id="props.id" :rank="3" :is-hidden="true"> 이용정보 </heading>
      </template>
    </navi>
    <div :class="$style[`footer__company-info`]">
      콘텐츠연합플랫폼 주식회사 <span aria-hidden="true">|</span> 대표이사
      김준환 <span aria-hidden="true">|</span> 고객센터 1599-3709 (평일
      09:00~18:00 / 점심시간 12:00~13:00 / 주말 및 공휴일 휴무) <br />
      사업자등록번호 220-88-38020 <span aria-hidden="true">|</span> 통신판매업
      신고번호 제 2015-서울마포-0128호
      <span aria-hidden="true">|</span> 서울특별시 마포구 상암산로 82, SBS
      프리즘 타워 14층
    </div>
    <p :class="$style[`footer__copyright`]">
      copyright © 콘텐츠연합플랫폼 주식회사 All rights reserved.
    </p>
  </div>
</template>

<script>
import Heading from '@atoms/Heading';
import Navi from '@molecules/Navigation';
export default {
  components: {
    Heading,
    Navi,
  },
  props: {
    navigations: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
