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
          db.questions.findAll().then((questionsWithOptions) => {
            userResponses.forEach((responseForQuestion) => {
              questionsWithOptions.forEach((questions) => {
                if (questions.questionId === responseForQuestion.questionId) {
                  send.push({
                    questionId: responseForQuestion.questionId,
                    response: responseForQuestion.response,
                  });
                }
              });
            });
            response(send);
          });
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
          const { allQuestions } = allQuestionsObject;
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
  path: '/changeResponse',
  method: 'POST',
  handler: (request, result) => {
    const username = request.payload.name;
    const { questionId } = request.payload;
    const { response } = request.payload;
    db.userresponses.upsert({
      name: username,
      questionId,
      response,
    }).then(() => {
      result('updated');
    });
  },
},
{
  path: '/calculateScore',
  method: 'POST',
  handler: (request, response) => {
    const username = request.payload.name;
    let score = 0;
    db.questions.findAll().then((allQuestions) => {
      db.userresponses.findAll({ where: { name: username } }).then((userResponses) => {
        allQuestions.forEach((question) => {
          userResponses.forEach((userResponseForQuestion) => {
            if (question.questionId === userResponseForQuestion.questionId) {
              if (question.answer === userResponseForQuestion.response) {
                score += 1;
              }
            }
          });
        });
        db.users.upsert({
          name: username,
          score,
        }).then(() => {
          response(score);
        });
      });
    });
  },
},
{
  path: '/topScorers',
  method: 'GET',
  handler: (request, response) => {
    db.users.findAll({
      limit: 5,
      order: [['score', 'DESC']],
    }).then((result) => {
      response(result);
    });
  },
}];
