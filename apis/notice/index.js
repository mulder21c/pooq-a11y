import { lastestNotice } from '~/mock/home';

export default ($axios, commonParam) => {
  return {
    getLatestNotice() {
      return new Promise((resolve, reject) => {
        resolve(lastestNotice || []);
      });
    },
  };
};
