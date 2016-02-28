import pgp from 'pg-promise';

export default function (dsn) {
  if (!dsn) {
    throw new Error('Using postgresql requires DSN/Connection string defined as PSQL_DSN on Node.js env.');
  }

  const db = pgp()(dsn);

  return {
    async fetchTopActiveUsers() {
      let users = await db.query(`
           SELECT u.id,
                  u.created_at,
                  u.name,
                  (SELECT COUNT(id) FROM applications a WHERE a.user_id = u.id) count
             FROM users u
         ORDER BY count DESC
      `);

      return users;
    },

    async fetchLastestListings(users) {
      users = await Promise.all(users.map(async user => {
        user.listings = await db.query(`
            SELECT l.name
              FROM listings l
             WHERE l.created_by = $1
          ORDER BY l.created_at DESC
             LIMIT 3
        `, user.id);

        return user;
      }));

      return users;
    }
  };
}
