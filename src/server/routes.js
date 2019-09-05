module.exports = (app, db) => {

  const granblue = require('./controllers/granblue')(db);

  // app.get('/pokemon/:id', pokemon.get);
  app.get('/characters', granblue.getAll);
};