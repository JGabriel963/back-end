import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose.connect(
    "mongodb+srv://JGabriel963:root@cluster0.oldfaoq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(() => console.log("MongoDB Atlas Connectde")).catch((error) => console.log(error))
};

export default connectDatabase
