const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are Disabled')
//     }
//     else {
//         next()
//     }

// })

// app.use((req, res, next) => {
//     res.status(503).send('Site Under Maintenance, Try after Some Time')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



// const router = new express.Router()
// router.get('/test', (req,res) => {
//     res.send('This is from my other router')
// })
// app.use(router)



app.listen(port,() => {
    console.log('server is up on ' + port)
})

// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//     const password = '1234'
//     const hashPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashPassword)

//     const isMatch = await bcrypt.compare('2468', hashPassword)
//     console.log(isMatch)
// }

// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
//     console.log(token)
//     const data = jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// myFunction()

// const pet = {
//     name : 'Mal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return {}
// }
// console.log(JSON.stringify(pet))

//New Features
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e777fc6af03754bac885986')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5e777ef1f417323ec0e4d370')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

    const user = await User.findById('5e777ef1f417323ec0e4d370')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}

main()