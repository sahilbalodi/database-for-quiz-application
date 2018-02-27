const Models = require('../models/');

beforeEach(() => Models.users.destroy({ truncate: true }));
afterEach(() => Models.users.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing the users model', () => {
  it('testing if table returns the inserted sample object', (done) => {
    const sampleUser = {
      name: 'sahil',
      score: 10,
    };
    Models.users.create(sampleUser).then((result) => {
      expect(result.name).toBe(sampleUser.name);
      expect(result.score).toBe(sampleUser.score);
      done();
    }).catch(err => console.log(err));
  });
});
