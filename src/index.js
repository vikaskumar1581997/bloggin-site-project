const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.json());



mongoose.connect("mongodb+srv://harshit073:BKiK0IK7mxwwDBu0@cluster0.f11hm.mongodb.net/BLog-Project-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});