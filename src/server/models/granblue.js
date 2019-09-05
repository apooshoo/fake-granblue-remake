/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // let create = (pokemon, callback) => {
  //   // set up query
  //   const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
  //     VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  //   const values = [
  //     pokemon.name,
  //     pokemon.num,
  //     pokemon.img,
  //     pokemon.weight,
  //     pokemon.height
  //   ];
  //   // execute query
  //   dbPoolInstance.query(queryString, values, (error, queryResult) => {
  //     // invoke callback function with results after query has executed
  //     if( error ){
  //       console.log("query error", error)
  //       // invoke callback function with results after query has executed
  //       callback(error, null);
  //     }else{
  //       // invoke callback function with results after query has executed
  //       if( queryResult.rows.length > 0 ){
  //         callback(null, queryResult.rows[0]);
  //       }else{
  //         callback(null, null);
  //       }
  //     }
  //   });
  // };
  let getAll = (callback) => {
    console.log('in model getAll');
    const query = `SELECT * FROM characters`;
    dbPoolInstance.query(query, (err, result) => {
        if(err){
            callback(err, null);
        } else if (result.rows.length > 0){
            callback(null, result.rows);
        } else {
            callback(null, null);
        }
    });
  }

  return {
    getAll
  };
};