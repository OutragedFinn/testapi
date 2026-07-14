const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/articles");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000"
    ],
    credentials: true
}));

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/articles", articleRoutes);



app.get("/", (req,res)=>{
    res.json({
        message:"Backend is running"
    });
});





// curl http://localhost:5050/user/me \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3ODM0ODI2NzYsImV4cCI6MTc4NDA4NzQ3Nn0.KdDD5OfJft_Ui9qHjEh2sEafwQveRPNydV2rgRlqVlU"
// curl http://localhost:5050/user/profile \
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3ODM0ODI2NzYsImV4cCI6MTc4NDA4NzQ3Nn0.KdDD5OfJft_Ui9qHjEh2sEafwQveRPNydV2rgRlqVlU"
// app.listen(5050,()=>{
//     console.log("Server running on port 5050");
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running`);
});
