const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const userRouter = require("./Routes/user");
const cors = require("cors");
require("./utils/cron");
const http = require("http");
const Server = require("socket.io").Server;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use((err, req, res, next) => {
  console.error("Error encountered:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


io.on('connection',(Socket)=>{
  console.log('new client connected');
  Socket.on('chat',chat => {
    io.emit('chat', chat)
  })

  Socket.on('disconnect', ()=>{
    console.log('disconnected');
  })
})
// Start the server
try {
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}
