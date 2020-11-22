import search from './search';

export default ($axios, commonParam) => ({
  search: search($axios, commonParam),
});
