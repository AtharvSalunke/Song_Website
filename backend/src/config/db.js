import mongoose from 'mongoose';


const connectDB = async() => {
   try{
   
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Your mongodb has connected, good luck");
   }
   catch(err){
    console.error("Error in connection (check the db.js file in config folder)", err.message);
    process.exit(1);

   }
};


export default connectDB;