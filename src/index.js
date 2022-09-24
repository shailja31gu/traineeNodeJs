const express = require('express');
const mongoose = require('mongoose')
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://rohan7599:MipvNOjb97usB2oZ@cluster0.lviwx.mongodb.net/group6Database?retryWrites=true&w=majority", { useUnifiedTopology: true },{useNewUrlParser: true})
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


