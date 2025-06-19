require('dotenv').config('');
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute.js');
const blogRoute = require('./routes/blogRoute.js');
require('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/blog', blogRoute);
    
// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:5000/ on port ${PORT}`);
});
