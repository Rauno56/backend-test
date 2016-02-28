import adapter from './adapter';
import inMemory from './inMemory';
import postgreSQL from './postgreSQL';

export default name => {
  const sources = {
    inMemory() {
      return inMemory();
    },

    postgreSQL() {
      return postgreSQL(process.env.DSN);
    }
  };

  return adapter(sources[name]());
}
