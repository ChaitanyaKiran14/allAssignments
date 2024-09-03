import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});


// export default mongoose.model('User', userSchema)
// export default mongoose.model('Todo', todoSchema)

export const User = mongoose.model('User', userSchema);
export const Todo = mongoose.model('Todo', todoSchema);