const dotenv = require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose')

const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Database connected successfully!")
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listerning on ${port}...............`);
});
