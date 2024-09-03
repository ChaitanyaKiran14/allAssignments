// import express from "express";

// const app = express();
// import mongoose from "mongoose";

// const port = 3000;

// import authRoutes from "./routes/auth"
// import todoRoutes from "./routes/todo"
// const cors = require("cors");

// app.use(cors());
// app.use(express.json());
// app.use("/auth", authRoutes);
// app.use("/todo", todoRoutes);

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

// mongoose.connect('mongodb+srv://gchaitanya1419:Chaitanya14@cluster0.bpwbtja.mongodb.net/', { dbName: "todos" });


import express from "express";
import mongoose from "mongoose";
const app = express();

const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://gchaitanya1419:Chaitanya14@cluster0.bpwbtja.mongodb.net/', { dbName: "todos" });




