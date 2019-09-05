module.exports = (db) => {
  // let get = (request, response) => {
  //     // use pokemon model method `get` to retrieve pokemon data
  //     console.log( db )
  //     db.pokemon.get(request.params.id, (error, pokemon) => {
  //       // queryResult contains pokemon data returned from the pokemon model
  //       if (error) {
  //         console.error('error getting pokemon', error);
  //         response.status(500);
  //         response.send('server error');
  //       } else {
  //         if( pokemon === null ){
  //           // render pokemon view in the pokemon folder
  //           response.status(404);
  //           response.send('not found');
  //         }else{
  //           // render pokemon view in the pokemon folder
  //           response.render('pokemon/show', { pokemon: pokemon });
  //         }
  //       }
  //     });
  // };
  let getAll = (req, res) => {
    console.log('in ctrler getAll');
    db.granblue.getAll((err, result) => {
        if(err){
            console.log('err', err);
        } else if (result === null){
            res.status(404).send('not found');
        } else {
            res.send( result)
        }
    });
  };

  return {
    // get : get,
    // apiget : apiget
    getAll : getAll
  }

};