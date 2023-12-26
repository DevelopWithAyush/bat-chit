const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://developwithdubey:ayushdubey@cluster0.ychgzs3.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connection successful")
}).catch((error)=>{
    console.log(`not connect ${error.message}`)
})

