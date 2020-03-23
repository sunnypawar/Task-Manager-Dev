const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// router.get('/test', (req,res) => {
//     res.send('This is from my other router')
// })


// app.post('/users',(req,res)=>{
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

// app.get('/users',(req,res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

router.get('/users/me', auth, async (req,res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch(e) {
    //     res.status(500).send(e)
    // }
    res.send(req.user)
})

// app.get('/users/:id',(req,res) => {

//     // console.log(req.params)
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if (!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch (e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((updates) => allowedUpdate.includes(updates))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Operations'})
    }
    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        // if(!req.user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }
    catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await  req.user.remove()
        res.send(req.user)
    } catch(e) {
        return res.status(400).send()
    }
})

module.exports = router