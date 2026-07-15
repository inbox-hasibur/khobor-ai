// Mocked User model
const mockQuery: any = Promise.resolve({ save: async () => null, role: 'user' });
mockQuery.sort = (...args: any[]) => mockQuery;
mockQuery.limit = (...args: any[]) => mockQuery;

const User = {
  find: (...args: any[]) => mockQuery,
  findOne: async (...args: any[]) => null,
  create: async (...args: any[]) => ({ _id: '1', name: '', email: '', role: 'user' }),
  findById: async (...args: any[]) => null,
  findOneAndUpdate: async (...args: any[]) => null,
};
export default User;
