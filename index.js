require('dotenv').config();
const express = require('express')
require('./src/db/mongoose')

const userRouter = require('./src/router/userRoute.js')
const productRouter = require('./src/router/productRoute.js');
const Product = require('./src/model/product');

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(productRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 0 * * *', function() {
  console.log('Cron function executed');
  Product.deleteMany({ 
    expiryDate: {
        $lt: new Date()
    }
}).then(result=>{
    console.log(result)
})
});
job.start();