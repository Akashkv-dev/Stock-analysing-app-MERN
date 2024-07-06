const express =require('express')
const bodyParser = require('body-parser');
const app =express()
require('dotenv').config()
const port=process.env.PORT
const userRouter=require('./Routes/user')
const cors =require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',userRouter);
app.use((err, req, res, next) => {
    console.error("Error encountered:", err);
    res.status(500).json({ message: "Internal Server Error" });
  });
  
  // Start the server
  try {
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }