const pg = require('pg')

let databaseName = 'weekend-to-do-app'

if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}

let pool;
if (process.env.DATABSE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABSE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true 
  });
}

// const pool = new pg.Pool({
//     host: 'localhost',
//     port: 5432,
//     database: databaseName,
//     allowExitOnIdle: true 
// })

module.exports = pool
