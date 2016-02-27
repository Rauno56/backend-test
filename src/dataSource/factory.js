import {
  adapter,
  inmemory,
  postgresql
} from './index';

export default name => {
  const sources = {
    inmemory() {
      return adapter(inmemory);
    },

    postgresql() {
      return adapter(postgresql);
    }
  };

  return sources[name];
}
