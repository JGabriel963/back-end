import mongoose from "mongoose";

mongoose.set("strictQuery", true)
mongoose.set("strictPopulate", false)

export async function connect() {
    try {
        const connection = await mongoose.connect("mongodb+srv://joaogabriel9633:130302jg@devhouse.tlgzrou.mongodb.net/?retryWrites=true&w=majority")
        console.log('Connected to MongoDB')
    } catch(error) {
        console.log(error.message)
    }
}