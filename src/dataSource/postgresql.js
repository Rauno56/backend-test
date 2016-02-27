import pgp from 'pg-promise';

if (!process.env.PSQL_DSN) {
  throw new Error('Using postgresql requires DSN/Connection string defined as PSQL_DSN on Node.js env.');
}

const db = pgp()(process.env.PSQL_DSN);

export default {
  async fetchTopActiveUsers() {
    const users = await db.query(`
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
