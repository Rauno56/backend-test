export default function () {
  return {
    fetchTopActiveUsers() {
      return Promise.resolve([
        {id: 1, createdAt: new Date(), name: 'Foo'},
        {id: 2, createdAt: new Date(), name: 'Bar'},
        {id: 3, createdAt: new Date(), name: 'Baz'}
      ]);
    },

    fetchLastestListings(users) {
      return Promise.resolve(users.map(user => {
        user.listings = ['for', 'bar', 'baz'];
        return user;
      }));
    },

    fetchUser(id) {
      return Promise.resolve({
        id: 1,
        name: 'Foo',
        createdAt: new Date(),
        companies: [{
          id: 1,
          createdAt: new Date(),
          name: 'Foo',
          isContact: true
        }],
        createdListings: [{
          id: 1,
          createdAt: new Date(),
          name: 'Foo',
          description: 'Foobar'
        }],
        applications: [{
          id: 1,
          createdAt: new Date(),
          listing: {
            id: 1,
            name: 'Foo',
            description: 'Foobar'
          },
          coverLetter: 'Foobar'
         }]
      });
    }
  };
}
