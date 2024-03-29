const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos"';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(`Error in GET, running query ${queryText}`, err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let text = req.body.text;
    // console.log(text);
    let queryText = 'INSERT INTO "todos" ("text") VALUES ($1);';
    pool.query(queryText, [text]).then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(`Error in POST, running query ${queryText}`, err);
        res.sendStatus(500);
    });
});

router.patch('/mark/:id', (req, res) => {
    let id = req.params.id;
    let queryText = 'UPDATE "todos" SET "isComplete" = true, "completedAt" = CURRENT_TIMESTAMP WHERE "id" = $1;';
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(`Error in PATCH, running query ${queryText}`, err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = 'DELETE FROM "todos" WHERE "id" = $1;';
    pool.query(queryText, [id]).then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(`Error in DELETE, running query ${queryText}`, err);
        res.sendStatus(500);
    });
});

module.exports = router;
