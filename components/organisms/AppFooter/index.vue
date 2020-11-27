<template>
  <fragment>
    <Notice :heading-rank="2" :foot-notice-list="footNoticeList" />
    <FootInfo :navigations="navigations" />
  </fragment>
</template>

<script>
import Notice from '@organisms/FootNotice';
import FootInfo from '@organisms/FootInfo';

export default {
  components: {
    Notice,
    FootInfo,
  },
  props: {
    navigations: {
      type: Array,
      required: false,
      default: () => [],
    },
    footNoticeList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style></style>
