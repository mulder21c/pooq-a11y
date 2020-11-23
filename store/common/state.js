const state = () => ({
  userInfo: {
    credential: `none`,
    pooqzone: `none`,
  },
  navigations: [
    {
      content: `방송VOD`,
      to: `#`,
    },
    {
      content: `실시간TV`,
      to: `#`,
    },
    {
      content: `영화`,
      to: `#`,
    },
    {
      content: `무료`,
      to: `#`,
    },
  ],
  subNavigations: [
    {
      content: `로그인`,
      to: `#`,
    },
    {
      content: `마이푹`,
      to: `#`,
    },
    {
      content: `이용권 구매`,
      to: `#`,
    },
  ],
  footNavigations: [
    {
      content: `회사 소개`,
      to: `#`,
    },
    {
      content: `서비스 소개`,
      to: `#`,
    },
    {
      content: `이용 약관`,
      to: `#`,
    },
    {
      content: `개인정보취급방침`,
      to: `#`,
    },
    {
      content: `고객센터`,
      to: `#`,
    },
  ],
});

export default state;
