export default function () {
  return {
    fetchTopActiveUsers() {
      return Promise.resolve([
        {id: 1, createdAt: new Date(), name: 'Foo'},
        {id: 2, createdAt: new Date(), name: 'Bar'},
        {id: 3, createdAt: new Date(), name: 'Baz'}
      ]);
    }
  };
}
