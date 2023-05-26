const express = require('express');
const mongoose = require('mongoose');
const Article = require('./Article');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//const url = "mongodb+srv://mongo-admin:pass@cluster0.b0wdnst.mongodb.net/wikiDB"; //atlas db url
const url = "mongodb://127.0.0.1:27017/wikiDB"; //local db url
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('mongoose connection to local db is successful'))
.catch((error) => console.error('Error connecting to local db:', error));


app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().exec();
    console.log(articles);
    res.send(articles); // Optionally, you can send the articles as a response to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* const article = new Article({ title: 'title 3', content: 'contnet 3' });
article.save()
  .then(() => console.log('mongoose article saved'))
  .catch((error) => console.error(error))
  .finally(() => mongoose.disconnect()); */

  app.listen(3000, ()=>{
    console.log('server is up and listening to port 3000');
  });