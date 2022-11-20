const express = require("express");
const env = require("dotenv").config();
const port = process.env.port || 5000;
const {errorHandler} = require("./middleware/errorMidware")
const connectDB = require('./config/db')
const path = require("path")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/api/tickets",require('./routes/goalRoutes'))
app.use("/api/users",require('./routes/userRoutes'))

//serve Frontend

if(process.env.NODE_ENV === "production" ){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
}else{
    app.get("/",(req,res)=> res.send("IN DEVELOPMENT"))
}

app.use(errorHandler)

app.listen(port,()=>console.log(`app running on Port: ${port}`))
