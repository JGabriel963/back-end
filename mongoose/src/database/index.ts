import mongoose from "mongoose";

mongoose.set("strictQuery", true)
mongoose.set("strictPopulate", false)

export async function connect() {
    try {
        const connection = await mongoose.connect("mongodb://admin:root@localhost:27017/my_db?authSource=admin")
        console.log('Connected to MongoDB')
    } catch(error) {
        console.log(error.message)
    }
}
