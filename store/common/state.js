const state = () => ({
  userInfo: {
    credential: `none`,
    pooqzone: `none`,
  },
  navigations: [
    {
      label: `방송VOD`,
      to: `#`,
    },
    {
      label: `실시간TV`,
      to: `#`,
    },
    {
      label: `영화`,
      to: `#`,
    },
    {
      label: `무료`,
      to: `#`,
    },
  ],
  subNavigations: [
    {
      label: `로그인`,
      to: `#`,
    },
    {
      label: `마이푹`,
      to: `#`,
    },
    {
      label: `이용권 구매`,
      to: `#`,
    },
  ],
  footNavigations: [
    {
      label: `회사 소개`,
      to: `#`,
    },
    {
      label: `서비스 소개`,
      to: `#`,
    },
    {
      label: `이용 약관`,
      to: `#`,
    },
    {
      label: `개인정보취급방침`,
      to: `#`,
    },
    {
      label: `고객센터`,
      to: `#`,
    },
  ],
});

export default state;
