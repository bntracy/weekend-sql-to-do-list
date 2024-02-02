const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos"';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(`Error running query ${queryText}`, err);
        res.sendStatus(500);
    });
});


module.exports = router;
