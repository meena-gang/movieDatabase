const express = require('express');
const movieModel = require('../model/movie.model')
const movieRouter = express.Router();

movieRouter.post('/data', async(req,res) => {
    try {
        const{name,rating,description,genre,releaseDate} = req.body;
        const existingMovie = await movieModel.findOne({name});
        if(existingMovie){
            return res.status(400).json({msg:"movie already exists"});
        }
        const movie = new movieModel({name,rating,description,genre,releaseDate});
        await movie.save();
        res.status(200).send(`data recived ${movie}`);
    } catch(error){
        res.status(404).send(`data not recived ${error}`);
    }
});

movieRouter.get('/getData', async(req,res) => {
    try{
        console.log(req.query);
        const{q,name,rating,sortBy,order} = req.query;
        let filter = {};
        if(q) filter.name = new RegExp(q, 'i');
        if(name) filter.name = name;
        if(rating) filter.rating = rating;
        
        let data = await movieModel.find(filter);
        if(sortBy&&order=="asc"){
            data = data.sort((a,b) => a[sortBy]-b[sortBy]);

        }else if(sortBy&&order=="desc"){
            data = data.sort((a,b) => b[sortBy]-a[sortBy]);

        }
        res.status(200).send(data);
    } catch(error){
        res.status(404).send(`data not found ${error}`);
    }
})

movieRouter.patch('/updateData/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const updateData = await movieModel.findByIdAndUpdate({_id:id},data);
        res.status(200).send(updateData);
    } catch(error){
        res.status(404).send(`data not updated ${error}`);
    }
})

movieRouter.delete('/deleteData/:id', async(req,res) => {
    try{
        const {id} = req.params;
       
        const deleletedData = await movieModel.findByIdAndDelete({_id:id});
        res.status(200).send(deleletedData);
    } catch(error){
        res.status(404).send(`data not updated ${error}`);
    }
})

module.exports = movieRouter;