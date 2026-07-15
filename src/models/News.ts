// Mocked News model
const mockQuery: any = Promise.resolve([]);
mockQuery.sort = (...args: any[]) => mockQuery;
mockQuery.limit = (...args: any[]) => mockQuery;

const News = {
  find: (...args: any[]) => mockQuery,
  findOne: async (...args: any[]) => null,
  create: async (...args: any[]) => null,
  findById: async (...args: any[]) => null,
  findOneAndUpdate: async (...args: any[]) => null,
  findByIdAndUpdate: async (...args: any[]) => null,
};
export default News;
