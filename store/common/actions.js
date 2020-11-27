const actions = {
  async fetchLastestNotice({ commit }) {
    const { getLatestNotice } = this.$api.notice;
    await getLatestNotice().then(data => {
      commit(`SET_LASTEST_NOTICE_LIST`, data.list || []);
    });
  },
};

export default actions;
