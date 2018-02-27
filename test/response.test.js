const Models = require('../models/');

beforeEach(() => Models.userresponses.destroy({ truncate: true }));
afterEach(() => Models.userresponses.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing the userresponse model', () => {
  it('testing if table returns the inserted sample object', (done) => {
    const sampleResponse = {
      name: 'sahil',
      questionId: 1,
      response: 'a',
    };
    Models.userresponses.create(sampleResponse).then((result) => {
      expect(result.name).toBe(sampleResponse.name);
      expect(result.response).toBe(sampleResponse.response);
      expect(result.questionId).toBe(sampleResponse.questionId);
      done();
    }).catch(err => console.log(err));
  });
  it('testing if two entries with same username can be inserted into table userresponse', (done) => {
    const sampleResponse1 = {
      name: 'sahil',
      questionId: 1,
      response: 'a',
    };
    const sampleResponse2 = {
      name: 'sahil',
      questionId: 2,
      response: 'b',
    };
    Models.userresponses.bulkCreate([sampleResponse1, sampleResponse2]).then(() => {
      Models.userresponses.findAll({ attributes: ['name'] }).then((result) => {
        expect(result.sort().map(a => a.name)).toEqual(['sahil', 'sahil'].sort());
        done();
      });
    });
  });
});
