import pgp from 'pg-promise';

const apiInterface = data => {
  if (data.created_at) {
    data.createdAt = data.created_at;
    delete data.created_at;
  }

  if (data.contact_user) {
    data.isContact = data.contact_user;
    delete data.contact_user;
  }

  return data;
}

export default function (dsn) {
  if (!dsn) {
    throw new Error('Using postgresql requires DSN/Connection string defined as PSQL_DSN on Node.js env.');
  }

  const db = pgp()(dsn);

  return {
    async fetchTopActiveUsers(page = 1, perPage = 3) {
      let limit  = perPage;
      let offset = (page - 1) * limit;

      let users = await db.query(`
           SELECT u.id,
                  u.created_at,
                  u.name,
                  (SELECT COUNT(id) FROM applications a WHERE a.user_id = u.id) count
             FROM users u
         ORDER BY count DESC
            LIMIT $1 OFFSET $2
      `, [limit, offset]);

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
                    a.cover_letter,
                    l.id listing_id,
                    l.name listing_name,
                    l.description listing_description
               FROM applications a
          LEFT JOIN listings l ON l.id = a.listing_id
              WHERE a.user_id = $1
        `, id)
      ]);

      return Object.assign(
        apiInterface(results[0]), {
          companies: results[1].map(apiInterface),
          createdListings: results[2].map(apiInterface),
          applications: results[3].map(application => ({
            id: application.id,
            createdAt: application.created_at,
            listing: {
              id: application.listing_id,
              name: application.listing_name,
              description: application.listing_description
            },
            coverLetter: application.cover_letter
          }))
        }
      );
    }
  };
}
