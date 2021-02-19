const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGPORT,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

//Get all records
/*const getRecords = (request, response) => {
  pool.query("SELECT * FROM views", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(response.status(200).json(results.rows));
    pool.end();
  });
};*/

//Get single record
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
  console.log(JSON.stringify(data));

  pool.query(
    "INSERT INTO views (latitude, longitude, heading) VALUES ($1, $2, $3)",
    [lat, lon, heading],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result.insertId);
    }
  );
};

module.exports = {
  //getRecords,
  //getRecordById
  saveRecord,
};
