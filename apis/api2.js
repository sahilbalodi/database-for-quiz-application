const https = require('https');
const BufferList = require('bl');

function getRating(question) {
  const url = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${question.questionId}`;
  const promise2 = new Promise((fulfill) => {
    https.get(url, (response) => {
      response.pipe(BufferList((error, data) => {
        if (error) { console.log(error); } else {
          question.answer = (JSON.parse(data.toString()).answer);
          fulfill(question);
        }
      }));
    });
  });
  return promise2;
}
module.exports = getRating;
