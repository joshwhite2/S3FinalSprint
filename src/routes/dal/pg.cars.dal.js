const pool = require("/Users/keyinstudent/Desktop/S3FinalSprint/Services/postgres.js");
console.log("Executing pg.cars.dal.js");

const getCarsPostgres = function (search) {
  const sql = `
    SELECT * FROM cars
    WHERE 
        make ILIKE $1
        OR model ILIKE $1
        OR year::text ILIKE $1
        OR colour ILIKE $1
        OR mileage::text ILIKE $1
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

module.exports = {
  getCarsPostgres,
};
