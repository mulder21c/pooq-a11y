import search from './search';
import banner from './banner';
import home from './home';

export default ($axios, commonParam) => ({
  search: search($axios, commonParam),
  banner: banner($axios, commonParam),
  home: home($axios, commonParam),
});
