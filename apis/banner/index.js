import { recommendBanner } from '~/mock/banner';

export default ($axios, commonParam) => {
  return {
    getRecommendBanner(keyword) {
      return new Promise((resolve, reject) => {
        resolve(recommendBanner.list || []);
      });
    },
  };
};
