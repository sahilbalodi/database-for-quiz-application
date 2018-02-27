const db = require('../models');
const api1Data = require('../apis/api1');
const getAnswer = require('../apis/api2');

module.exports = [{
  path: '/ping',
  method: 'GET',
  handler: (request, response) => {
    response('pong');
  },
},
{
  path: '/user/login',
  method: 'POST',
  handler: (request, response) => {
    const username = request.payload.name;
    db.users.findOrCreate({
      where: { name: username },
      defaults: { score: 0 },
    }).spread((user, created) => {
      if (created) {
        response([]);
      } else {
        db.userresponses.findAll({ where: { name: username } }).then((userResponses) => {
          const send = [];
          userResponses.forEach((responseForQuestion) => {
            send.push({
              questionId: responseForQuestion.Id,
              response: responseForQuestion.response,
            });
          });
          response(send);
        });
      }
    });
  },
},
{
  path: '/readQuestion',
  method: 'GET',
  handler: (request, response) => {
    db.questions.findAll().then((questionsWithOptions) => {
      if (questionsWithOptions.length === 0) {
        api1Data().then((data) => {
          const allQuestionsObject = JSON.parse(data);
          const allQuestions = allQuestionsObject.allQuestions;
          const dataAboutAllQuestions = [];
          allQuestions.forEach((question) => { dataAboutAllQuestions.push(getAnswer(question)); });
          Promise.all(dataAboutAllQuestions).then((values) => {
            const contents = values;
            console.log(values);
            db.questions.destroy({ truncate: true, where: {} }).then(() => {
              contents.forEach((x) => {
                const options = [];
                let i = 1;
                while (x[`option${i}`] !== (null || undefined)) {
                  options.push(x[`option${i}`]);
                  i += 1;
                }
                console.log(options);
                db.questions.create({
                  questionId: x.questionId,
                  question: x.question,
                  answer: x.answer,
                  options,
                });
              });
            }).then(() => {
              db.questions.findAll().then((questionsInDatabase) => {
                const questionsWithOptionsObject = [];
                questionsInDatabase.forEach((question) => {
                  questionsWithOptionsObject.push({
                    questionId: question.questionId,
                    question: question.question,
                    options: question.options,
                  });
                });
                response(questionsWithOptionsObject);
              });
            });
          });
        });
      } else {
        db.questions.findAll().then((questionsInDatabase) => {
          const questionsWithOptionsObject = [];
          questionsInDatabase.forEach((question) => {
            questionsWithOptionsObject.push({
              questionId: question.questionId,
              question: question.question,
              options: question.options,
            });
          });
          response(questionsWithOptionsObject);
        });
      }
    });
  },
},
{
  path: '/ping',
  method: 'GET',
  handler: (request, response) => {
    response('pong');
  },
}];
