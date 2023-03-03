const mongoose = require('mongoose');


const connectDB = async () => {

   try{
  //mongoose.set("strictQuery", false);
     const con=await mongoose.connect(process.env.MONGO_URI,
       {

      useUnifiedTopology:true,
      useNewUrlParser:true,
  

    });
    console.log(`Connected to Mongo Database:${con.connection.host}`);
  }catch(err){
      console.log(err);
      process.exit(1);
    }
}

module.exports = connectDB


