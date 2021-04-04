let oracledb = require('oracledb');
let options = {
  outFormat: oracledb.OBJECT,
  autoCommit: true
}


function executeQuery(query) {
  return new Promise( async (resolve, reject) => {
    let result = null;
    try {
      connection = await oracledb.getConnection();
      let binds = [];
      result = await connection.execute(query, binds, options);
    } catch (err) {
      reject(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          reject(err);
        }
      }
      resolve(result);
    }
  })
}

module.exports = {
  executeQuery: executeQuery
}
