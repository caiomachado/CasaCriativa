const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./primeiroProjeto.db")

db.serialize(function () {

  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

  //   const query = `
  //   INSERT INTO ideas(
  //     image,
  //     title,
  //     category,
  //     description,
  //     link
  //   ) VALUES (?,?,?,?,?);
  //   `

  //   const values = [
  //     req.body.image,
  //     req.body.title,
  //     req.body.category,
  //     req.body.description,
  //     req.body.link
  //   ]
  //   db.run(query, values, function (err) {
  //     if (err) return console.log(err)

  //     console.log(this)
  //   })

  //   db.run(`DELETE FROM ideas WHERE id = ?`, [3], function (err) {
  //     if (err) return console.log(err)
  //   })

  //   db.all(`SELECT * FROM ideas`, function (err, rows) {
  //     if (err) return console.log(err)

  //     console.log(rows)
  //   })
  // })

  module.exports = db
})