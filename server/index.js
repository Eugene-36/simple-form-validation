const express = require('express');
const app = express();
const PORT = 3001;

const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'eguene',
  password: process.env.SECRET_KEY,
  database: 'data_use_js',
});

app.post('/create', (req, res) => {
  console.log('regbody', req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const skills = req.body.skills;
  const hero = req.body.hero;
  const text = req.body.text;

  let sql =
    'INSERT INTO users (name, email, password, phoneNumber, skills, hero, text) VALUES (?,?,?,?,?,?,?)';

  db.query(
    sql,
    [name, email, password, phoneNumber, skills, hero, text],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log('result', result);
        res.send({message:'Values inserted....'});
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Your server is running on  port ${PORT}`);
});
