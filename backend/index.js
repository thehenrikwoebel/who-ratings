const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./db/database.db');
const sql_classics ='SELECT * FROM classics;';
const sql_newWho = 'SELECT * FROM newWho;';
const sql_newWho_heart = 'UPDATE newWho SET heart = 1 WHERE episode = ?;';
const sql_newWho_unheart = 'UPDATE newWho SET heart = 0 WHERE episode = ?;';
const sql_classics_heart = 'UPDATE classics SET heart = 1 WHERE episode = ?;';
const sql_classics_unheart = 'UPDATE classics SET heart = 0 WHERE episode = ?;';
const sql_newWho_hearts = 'SELECT * FROM newwho WHERE heart > 0;';
const sql_classics_hearts = 'SELECT * FROM classics WHERE heart > 0;';
const sql_newWho_season = 'SELECT * FROM newwho WHERE season = ?;';
const sql_classics_season = 'SELECT * FROM classics WHERE season = ?;';
const sql_classics_rating = 'SELECT * FROM classics WHERE rating > 0 ORDER BY rating DESC;';
const sql_newWho_rating = 'SELECT * FROM newwho WHERE rating > 0 ORDER BY rating DESC;';
const sql_classics_rate = 'UPDATE classics SET rating = ? WHERE episode = ?;';
const sql_newWho_rate = 'UPDATE newwho SET rating = ? WHERE episode = ?;';
const sql_insert = 'INSERT INTO todos (text) VALUES (?);';
const sql_delete = "DELETE FROM todos WHERE text=?;";

app.use(express.static('../dist'));

app.get("/api/db/getClassics", (req, res) => {
    db.all(sql_classics, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getNewWho", (req, res) => {
    db.all(sql_newWho, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getNewWhoHearts", (req, res) => {
    db.all(sql_newWho_hearts, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getClassicsHearts", (req, res) => {
    db.all(sql_classics_hearts, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getNewWho/:season", (req, res) => {
    db.all(sql_newWho_season, [req.params.season], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getClassics/:season", (req, res) => {
    db.all(sql_classics_season, [req.params.season], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getClassicsratings", (req, res) => {
    db.all(sql_classics_rating, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/getNewWhoratings", (req, res) => {
    db.all(sql_newWho_rating, [], (err, rows) => {
        if(err) {
            throw err;
        } else {
            res.send(rows);
            console.log(rows);
        }
    });
});

app.get("/api/db/rateNewWho/:episode/:rating", (req, res) => {
    db.run(sql_newWho_rate, [req.params.rating, req.params.episode]);
    res.sendStatus(200);
    console.log("Episode " + req.params.episode + " hat jetzt ein Rating von " +  req.params.rating);
});

app.get("/api/db/rateClassic/:episode/:rating", (req, res) => {
    db.run(sql_classics_rate, [req.params.rating, req.params.episode]);
    res.sendStatus(200);
    console.log("Episode " + req.params.episode + " hat jetzt ein Rating von " +  req.params.rating);
});

app.get("/api/db/heartNewWho/:episode", (req, res) => {
    db.run(sql_newWho_heart, [req.params.episode]);
    res.sendStatus(200);
});

app.get("/api/db/heartclassics/:episode", (req, res) => {
    db.run(sql_classics_heart, [req.params.episode]);
    res.sendStatus(200);
});

app.get("/api/db/unheartclassics/:episode", (req, res) => {
    db.run(sql_classics_unheart, [req.params.episode]);
    res.sendStatus(200);
});

app.get("/api/db/unheartNewWho/:episode", (req, res) => {
    db.run(sql_newWho_unheart, [req.params.episode]);
    res.sendStatus(200);
});

/*app.get("/api/db/insertTodo/:name", (req, res) => {
    db.run(sql_insert, [req.params.name]);
    res.status(200);
    res.send("");
});

app.get('/api/db/deleteTodo/:name', (req, res) => {
    db.run(sql_delete, [req.params.name]);
    console.log("deleted " + req.params.name.toString() + " from Database!");
});*/

app.listen(3000, () => {
    console.log("App listens on Port 3000!");
});