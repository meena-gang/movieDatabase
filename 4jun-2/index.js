const express = require('express');
const connection = require('./config/db');
const movieRouter = require('./routes/movie.routes');


const server = express();
server.use(express.json());
server.use('/movie',movieRouter);



server.listen(3000, async() => {
    try{
        await connection;
        console.log('Server is running on port 3000 and db is also connected');
    }catch(error){
        console.log(error)
    }
});

