const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appName=MongoDB%2520Compss&directConnection=true";

const connectToMongo=()=>{
    mongoose.connect(mongoURI);   
}
// mongoose.connection.on('connected', () => {
//     console.log(`Mongoose default connection open`);
//   });
  
module.exports = connectToMongo;
