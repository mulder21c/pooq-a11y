import search from './search';
import banner from './banner';
import home from './home';
import notice from './notice';

export default ($axios, commonParam) => ({
  search: search($axios, commonParam),
  banner: banner($axios, commonParam),
  home: home($axios, commonParam),
  notice: notice($axios, commonParam),
});
