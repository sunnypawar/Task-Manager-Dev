require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e63abbf9ed47e3ec4b0776d').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('5e63ee549ea09938183dc35d',2).then((count)=>{
    console.log(count)
}).catch((e) => {
    console.log(e)
})