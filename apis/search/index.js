import merge from 'lodash/merge';
import filter from 'lodash/filter';

export default ($axios, commonParam) => {
  return {
    getSearchContent(keyword) {
      const params = merge(commonParam, {
        drm: `wm`,
        type: `all`,
        offset: 0,
        limit: 15,
        orderby: `score`,
        keyword,
      });
      return new Promise((resolve, reject) => {
        $axios
          .get(`https://apis.pooq.co.kr/search`, { params })
          .then(response => {
            if (response.status !== 200) reject(new Error(`Server Error`));
            const [result] = filter(
              response.data,
              item => item.type === `programlist`,
            );
            resolve(result ? result.list : []);
          })
          .catch(err => reject(err));
      });
    },
  };
};
