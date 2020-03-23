//CRUD Create READ UPDATE DELETE

// const mongodb = require ('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databasename = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client) =>{
    if(error){
        return console.log('Unable to connect to DB')
    }
    const db = client.db(databasename)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name:'Sunny',
    //     age: 35
    // })

    // db.collection('users').insertOne({
    //     name:'Sunny',
    //     age: 35
    // },(error, result) => {
    //     if (error) {
    //         return console.log('Unable to inser User')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Apurva',
    //         age: 30,
    //     }, {
    //         name:'Prachi',
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'First Task',
    //         completed:false
    //     },         {
    //         description: 'Second Task',
    //         completed:false
    //     },         {
    //         description: 'Third Task',
    //         completed:true
    //     }
    // ],(error,result) => {
    //     if(error) {
    //         return console.log('Unable to Insert')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').findOne({_id:new ObjectID('5e5a388c50c3a511e08c46d8')}, (error,user) =>{
    //     if(error){
    //         return console.log('Unable to find user')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({age:30}).toArray((error,users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({age:30}).count((error,count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id:ObjectID("5e5a2f08266c3a173851971a")}, (error,task) => {
    //     if(error){
    //         return console.log('Unable to Find Task')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error,tasks) => {
    //     console.log(tasks)
    // })

    // const updatePromise = db.collection('users').updateOne(
    //     {
    //         _id:new ObjectID("5e5a2a2aade184195c950d11")
    //     },{
    //         $set : {
    //             name:'Sunny Pawar'
    //         }
    //     })
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id:new ObjectID("5e5a2a2aade184195c950d11")
    //     },{
    //         // $set : {
    //         //     name:'Sunny Pawar'
    //         // }
    //         $inc: {
    //             age : 1.5
    //         }
    //     }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany(
    //     {
    //         completed:false
    //     },{
    //         $set :{
    //             completed : true
    //         }
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // db.collection('users').deleteMany(
    //     {
    //         age:35
    //     }).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })

    db.collection('tasks').deleteOne(
        {
            description:"Third Task"
        }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})