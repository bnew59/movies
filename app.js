const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const PORT = 3000

let movies = []
app.use(express.static('movies'))
app.use(bodyParser.urlencoded({extended:false}))
app.engine('mustache', mustacheExpress())
app.use(express.static('css'))
app.set('views', './views')
app.set('view engine', 'mustache')

// I want this -> localhost:3000/myamazingwebsite/site.css
app.use('/myamazingwebsite',express.static('css'))

// route parameters
app.get('/movies/:genre/:year',function(req,res){
  res.send("genre is " + req.params.genre + " and year is " + req.params.year)
})


app.get('/',function(req,res){
  res.render('index', {movies : movies})
})


app.get('/movies',function(req,res){
    res.render('index', {movies : movies})
  })

app.post('/delete-movie',function(req,res){

    let title = req.body.movieName
    console.log(title)

    movies = movies.filter(function(movie){
      return movie.title != title
    })

    res.redirect('/movies')

})

// app.get('/', (req, res)=> {
//     console.log("HERE!")
//     res.json({title: "WORK"})
// })


// app.get('/home', (req, res)=> {
//     res.render("home", {fullName: "Movie"})
// })

app.post("/add-movie",function(req,res){

    let title = req.body.movieTitle
    movies.push({title: title})

    // redirect will invoke the /trips route
    res.redirect("/add-movie")

  })

  app.get("/add-movie",function(req,res){
    res.render("add-movie")
  })

  app.get('/movies',(req,res) => {

  res.render('movies',{ movieList : movies })
  
})
// res.redirect('/movie')

app.listen(PORT, ()=>{
    console.log("listening on port", PORT)
})
