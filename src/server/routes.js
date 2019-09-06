module.exports = (app, db) => {

  const granblue = require('./controllers/granblue')(db);

  app.post('/characters/new', granblue.add);
  app.get('/characters/:id', granblue.getAll);
};