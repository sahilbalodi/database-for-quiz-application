const Models = require('../models/');

beforeEach(() => Models.questions.destroy({ truncate: true }));
afterEach(() => Models.questions.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing the questions model', () => {
  it('testing if table returns the inserted sample object', (done) => {
    const sampleQuestion = {
      questionId: 1,
      question: 'who is the president of USA',
      options: ['a', 'b', 'c'],
      answer: 'a',
    };
    Models.questions.create(sampleQuestion).then((result) => {
      expect(result.questionId).toBe(sampleQuestion.questionId);
      expect(result.question).toBe(sampleQuestion.question);
      expect(result.answer).toBe(sampleQuestion.answer);
      done();
    }).catch(err => console.log(err));
  });
});
