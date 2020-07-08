const express = require("express")
const server = express()

const db = require("./db")

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//     title: "Curso de Programação",
//     category: "Estudo",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//     title: "Exercícios",
//     category: "Saúde",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title: "Meditação",
//     category: "Religião",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//     title: "Karaokê",
//     category: "Diversão em Família",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//     title: "Pintura",
//     category: "Criatividade",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },

//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//     title: "Recortes",
//     category: "Criatividade",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet error",
//     url: "https://rocketseat.com.br"
//   },
// ]

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

server.get("/", function (ord, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    const reversedIdeas = [...rows].reverse()
    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2)
        lastIdeas.push(idea)
    }
    return res.render("index.html", { ideas: lastIdeas })
  })
})

server.get("/ideias", function (ord, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html", { ideas: reversedIdeas })
  })
})

server.post("/", function (req, res) {
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    return res.redirect("/ideias")
  })
})

server.listen(3000)