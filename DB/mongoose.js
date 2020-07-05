const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://taskapp:@Lucknow160@cluster0-jfyyd.mongodb.net/url-shortner?w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connect to Database');
}).catch(err => {
    console.log('DB connection failed!');
});
