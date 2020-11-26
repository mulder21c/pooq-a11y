import { popVods, popLives } from '~/mock/home';

export default ($axios, commonParam) => {
  return {
    getPopVods() {
      return new Promise((resolve, reject) => {
        resolve(popVods.list || []);
      });
    },
    getPopLives() {
      return new Promise((resolve, reject) => {
        resolve(popLives.list || []);
      });
    },
  };
};
