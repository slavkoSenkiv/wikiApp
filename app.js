// requirements
const express = require('express');
const mongoose = require('mongoose');
const Article = require('./Article');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//mongoose boilerplate
//const url = "mongodb+srv://mongo-admin:pass@cluster0.b0wdnst.mongodb.net/wikiDB"; //atlas db url
const url = "mongodb://127.0.0.1:27017/wikiDB"; //local db url
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('mongoose connection to local db is successful'))
.catch((error) => console.error('Error connecting to local db:', error));


function handlePromise (promise, successMessage, res) {
  promise
    .then((result) => {
      console.log(successMessage);
      console.log(result);
      res.send(result);
     })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};


app.route('/articles')

  .get(async (req, res) => {
    handlePromise(Article.find().exec(), 'Articles fetched', res);
  })
  
  .post((req, res)=>{
    const article = new Article({ 
      title: req.body.title, 
      content: req.body.content
    });
    handlePromise(article.save(), 'Article saved', res);
  })
  
  .delete((req, res)=>{
    handlePromise(Article.deleteMany(), 'Articles deleted', res);
  })


app.route('/articles/:articleTitle')

  .get((req, res) =>{
    let articleTitle = req.params.articleTitle; 
    handlePromise(Article.findOne({title: articleTitle}).exec(), `Search "${articleTitle}" article: \n`, res);
  })

  .put((req, res)=>{
    let articleTitle = req.params.articleTitle;
    let newArticleTitle = req.body.title;
    let newArticleContent = req.body.content;

    Article.findOneAndUpdate(
      {title: articleTitle},
      {title: newArticleTitle,
      content: newArticleContent},
      {overwrite: true,
      new: true})

    .then((result) => {
      console.log('Article succesfully updated');
      console.log(result);
      res.send(result);
      })
    
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });

  });


app.listen(3000, ()=>{
  console.log('server is up and listening to port 3000');
});