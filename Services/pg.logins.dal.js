const dal = require("./p.db");

async function getLogins() {
  let SQL = `SELECT id AS _id, username, password, email, uuid FROM public."Logins"`;
  try {
    let results = await dal.query(SQL, []);
    return results.rows;
  } catch (error) {
    console.log(error);
  }
};
async function getLoginByEmail(email) {
  let SQL = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" WHERE email = $1`;
  try {
    let results = await dal.query(SQL, [email]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }  
};
async function getLoginById(id) {
  let SQL = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" WHERE id = $1`;
  try {
    let results = await dal.query(SQL, [id]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  } 
};
async function addLogin(name, email, password, uuidv4) {
  let SQL = `INSERT INTO public."Logins"(username, email, password, uuid)
    VALUES ($1, $2, $3, $4) RETURNING id;`
  try {
    let results = await dal.query(SQL, [name, email, password, uuidv4]);
    return results.rows[0].id;
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
    getLogins,
    addLogin,
    getLoginByEmail, 
    getLoginById,
  }