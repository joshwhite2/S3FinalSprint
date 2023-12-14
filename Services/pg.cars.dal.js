// to retreieve cars based on search criteria

const pool = require("../Services/postgres");

const getCarsPostgres = function (search) {
  const sql = `
    SELECT * FROM cars
    WHERE 
        make ILIKE $1
        OR model ILIKE $1
        OR year ILIKE $1
        OR colour ILIKE $1
        OR mileage ILIKE $1
        OR vin ILIKE $1`;

  return new Promise(function (resolve, reject) {
    pool.query(sql, [`%${search}%`], (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};
