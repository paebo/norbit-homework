const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//Get all records
const getRecords = (request, response) => {
  result = pool.query("SELECT * FROM record", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
    //pool.end();
  });
};

//Get single record (for future development)
/*const getRecordById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM views WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}*/

const saveRecord = (data) => {
  const { lat, lon, heading } = data;

  pool.query(
    `INSERT INTO record (lat, lon, heading)
    VALUES (${lat}, ${lon}, ${heading})`,
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

module.exports = {
  getRecords,
  //getRecordById
  saveRecord,
};
