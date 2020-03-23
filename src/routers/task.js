const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/tasks', auth, async (req,res)=>{
    // const task = await new Task(req.body)
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

// app.get('/tasks',(req,res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e){
        res.status(500).send(e)
    }
})

// app.get('/tasks/:id',(req,res) => {

//     // console.log(req.params)
//     const _id = req.params.id
//     Task.findById(_id).then((task) => {
//         if (!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

router.get('/tasks/:id',async (req,res) => {

    // console.log(req.params)
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {

    }
})

router.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = updates.every((updates) => allowedUpdate.includes(updates))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Operations'})
    }
    try {

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        return res.status(400).send()
    }
})

module.exports = router