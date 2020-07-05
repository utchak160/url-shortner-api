const path = require('path');
const express = require('express');
require('./DB/mongoose');
const bodyParser = require('body-parser');

const urlRoutes = require('./routes/url-routes');

const app = express();
const Port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(urlRoutes);


app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
