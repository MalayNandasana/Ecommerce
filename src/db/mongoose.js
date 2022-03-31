const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successfull!');
}).catch((e) => {
  console.log(e);
    console.log('Connection failed!');
})