import { CategorySchema } from './category.schema';

describe('CategorySchema', () => {
  it('should be defined', () => {
    expect(new CategorySchema()).toBeDefined();
  });
});
