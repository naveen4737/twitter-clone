const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: ".env"});
const connectDb = require("./config/connectDb");

console.log("server running")
console.log(process.env.PORT)

// config dot env file

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.method+", "+req.url);
    console.log(req.body);
    console.log(req.headers);
    console.log(req.params);
    next();
})

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoutes"));
//tweet routes routes
app.use("/api/v1/tweet", require("./routes/tweetRoutes"));

//static files
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});