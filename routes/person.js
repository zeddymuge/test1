const express =  require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/', async (req, res) =>{
    try{
        const person = new Person(req.body);
        await person.save();
        res.status(201).json(person);
    }
    catch (error){
        res.status(400).json({error: 'Failed to create a person.'})
    }
});

router.get('/' , async (req, res) =>{
    try {
        const person = await Person.find({});
        res.status(200).json(person);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const person = await Person.findById(req.params.id);
        if (!person){
           return  res.status(404).json({error: 'person not found.'});
        }
        res.status(200).json(person);
    }
    catch (error){
        res.status(500).json({error: 'Failed to find person.'});
    }
});

router.put('/:id', async (req, res) =>{
    try{
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!person){
           return  res.status(404).json({error: 'person not found.'});
        }
        res.status(200).json(person);
    }
    catch (error){
        res.status(500).json({error: 'Failed to update person.'});
    }
});

router.delete('/:id', async (req, res) =>{
    try{
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person){
           return  res.status(404).json({error: 'person not found.'});
        }
        res.status(204).send();
    }
    catch (error){
        res.status(500).json({error: 'Failed to update person.'});
    }
});

router.get('/search', async function(req, res) {
    let page = req.query.page;
    let limit = req.query.limit;
    let search= req.query.q;
    
    pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query("SELECT * FROM beers WHERE name LIKE '%${search}%' ", (err, rows) => {
        connection.release()

        if(!err) {
            res.send(rows)
        } else {
            console.log(err)
        }

    })
  })
});

  

module.exports = router;
