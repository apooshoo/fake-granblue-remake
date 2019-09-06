module.exports = (app, db) => {

  const granblue = require('./controllers/granblue')(db);

  app.get('/characters/:id', granblue.getUsersCharacters);
  app.post('/characters/new', granblue.add);

  app.get('/characters', granblue.getAll);
};