const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;


mongoose.connect(URL)
.then(()=>{
    console.log('MongoDb Connection Successfully..');
}).catch((err)=>{
    console.log('MongoDB Connection Failed.',err);
})