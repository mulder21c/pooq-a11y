import search from './search';
import banner from './banner';

export default ($axios, commonParam) => ({
  search: search($axios, commonParam),
  banner: banner($axios, commonParam),
});
