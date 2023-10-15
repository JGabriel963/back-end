import { Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: { type: String, unique: true, requided: true}
})

export const User = model("User", UserSchema)