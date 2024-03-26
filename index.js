import express from "express";
import connectToDB from "./config/db.js";
import userRoutes from "./routes/user_routes.js";
import courseRoutes from "./routes/course_routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectToDB();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/users/', userRoutes);
app.use('/api/courses/', courseRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})

app.get('/', (req, res) => {
    res.send('WELCOME TO E - LEARNING PLATFORM');
})

