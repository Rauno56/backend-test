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
      return await Promise.all(users.map(async user => {
        user.listings = await db.query(`
            SELECT l.name
              FROM listings l
             WHERE l.created_by = $1
          ORDER BY l.created_at DESC
             LIMIT 3
        `, user.id);

        return user;
      }));
    },

    async fetchUser(id) {
      let results = await Promise.all([
        db.one(`
          SELECT u.id,
                 u.name,
                 u.created_at
            FROM users u
           WHERE u.id = $1
        `, id),
        db.query(`
          SELECT c.id,
                 c.created_at,
                 c.name,
                 t.contact_user
            FROM companies c
            JOIN teams t ON t.company_id = c.id
           WHERE t.user_id = $1
        `, id),
        db.query(`
          SELECT l.id,
                 l.created_at,
                 l.name,
                 l.description
            FROM listings l
           WHERE l.created_by = $1
        `, id),
        db.query(`
          SELECT a.id,
                 a.created_at,
                 a.cover_letter
            FROM applications a
           WHERE a.user_id = $1
        `, id)
      ]);

      return Object.assign(
        results[0], {
          companies: results[1],
          createdListings: results[2],
          applications: results[3]
        }
      );
    }
  };
}
