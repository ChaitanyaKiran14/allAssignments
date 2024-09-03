const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const secret = "secr3t"

//schema 
const adminSchema = new mongoose.Schema({
    username : String,
    password :  String,
})

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{type : mongoose.Schema.Types.ObjectId, ref : 'Course'}]  //ref mea ns store something to reference in this schema
})

const coursesSchema  = new mongoose.Schema({
    title : String,
    descrption : String,
    published : Boolean,
})

//define models

const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course  = mongoose.model('Model', coursesSchema)

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.sendStatus(401);
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
};
  


mongoose.connect('mongodb+srv://gchaitanya1419:Chaitanya14@cluster0.bpwbtja.mongodb.net//courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

//admin routes
app.post('admin/signup', async (req,res) => {
    const {username, password} = req.body
    const admin = Admin.findOne({username})
    if (admin){
        res.status(403).json({message : "Admin already exists"})
    } else {
        const newAdmin = new Admin({username, password})
        await newAdmin.save()
        const token = jwt.sign({username, role : 'admin'}, SECRET, {expiresIn : '1h'}) // jwt.sign(payload/object, secret , {expiresIn : '1hr})
        res.json({message : 'Admin Created Successfully', token})

    }
})

app.post("admin/signin", (req, res) => {
    const {username, password} = req.headers
    const checkAdmin = Admin.findOne({username, password})
    if (checkAdmin){
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({message: "Invalid username or password"})
    }
    
})

app.post("admin/courses", authenticateJwt, async (req, res) => {
    const content = req.body
    const newCourse = new Course(content)
    await newCourse.save()
    res.json({message : "Course added succesfully", courseId : newCourse.id})
})

app.put("admin/courses/courseId",  authenticateJwt, async (req, res) => {
    const course = Course.findByIdAndUpdate(req.params.id, req.body, {new : true})
    if (course){
        res.json({message : "Course updated Successfuly"})
    } else{
        res.status(403).json({message : "Couse not found"})
    }
} )


app.get("admin/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({})
    res.json({courses})
})


//userroutes

app.post('/users/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
});


app.get("/users/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({published : true})
    res.json({courses})
})
app.get("/users/courses/courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId)
    if (course){
        const user = Course.findOne({username : req.user.username})
        if (user){
            user.purchasedCourses.push(course)
            await user.save()
            res.json({message : "Course purchased successfully"})

        } else {
            res.status(403).json({message : 'User Not Found'})
        }      
    } else {

        res.status(403).json({message : 'Course Not Found'})
    }
})

app.get("/user/courses/purchasedCourses" , authenticateJwt, async (req, res) => {
    const user = User.findOne({username : req.user.username}).populate("purchasedcourses")
    if (user){
        res.json({purchasedCourses : user.purchasedCourses || [] })

    } else{
        res.status(403).json({message : "User not found"})
    }
})



app.listen(5000, () => console.log("server running  on port 5000"))