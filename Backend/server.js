import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import mongoose from 'mongoose'
import ToDo from './MongoSchemas/to_do.js'
const serve = express()
serve.use(bodyParser.json())
serve.use(cors())
serve.post('/post_new_to_do', async (req, res, next) => {
    mongoose.connect('mongodb://127.0.0.1:27017/To_Do_Database')
    await ToDo.create({ to_do_item: req.body.task, deadline: req.body.deadline, category: req.body.category })
    res.send('Posted')
})
serve.get('/get_data_from_mongoDB', async (req, res, next) => {
    mongoose.connect('mongodb://127.0.0.1:27017/To_Do_Database')
    const to_do_data = await ToDo.find()
    res.json(to_do_data)
})
serve.get('/get_to_do_by_ID/:id', async (req, res, next) => {
    mongoose.connect('mongodb://127.0.0.1:27017/To_Do_Database')
    const parti_data = await ToDo.findById({ _id: req.params.id })
    res.json(parti_data)
})
serve.put('/update_parti_item/:id', async (req, res, next) => {
    mongoose.connect('mongodb://127.0.0.1:27017/To_Do_Database')
    await ToDo.updateOne({ _id: req.params.id }, { to_do_item: req.body.task, deadline: req.body.deadline })
    res.send('Updated')
})
serve.delete('/delete_to_do_item/:id', async (req, res, next) => {
    mongoose.connect('mongodb://127.0.0.1:27017/To_Do_Database')
    await ToDo.deleteOne({ _id: req.params.id })
    res.send('Deleted')
})
serve.listen(5000, () => {
    console.log('Server listening on port 5000.....')
})