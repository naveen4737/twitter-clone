const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: ".env"});
const connectDb = require("./config/connectDb");

//databse call
connectDb();

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

// routes
app.use("/api/v1/users", require("./routes/userRoutes"))
app.use("/api/v1/tweet", require("./routes/tweetRoutes"));

// sending react frontend
if(process.env.NODE_ENV === "production"){
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});