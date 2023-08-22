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

app.use("/api/v1/users", require("./routes/userRoutes"))
app.use("/api/v1/tweet", require("./routes/tweetRoutes"));


if(process.env.NODE_ENV === "production"){
  console.log("iosdn");
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "build", "index.html"))
  })
}
else{
  app.get("/", (req, res) => {
    console.log(process.env.NODE_ENV)
    res.send("api running");
  })
}


const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});