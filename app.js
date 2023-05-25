const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const url = "mongodb+srv://mongo-admin:pass@cluster0.b0wdnst.mongodb.net/wikiDB";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(console.log('mongoose connection to db is successfull'));

/* const user = new User({ name: 'Slav1', age: 29 });
user.save()
  .then(() => console.log('mongoose user saved'))
  .catch((error) => console.error(error))
  .finally(() => mongoose.disconnect()); */