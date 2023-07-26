import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import routes from './src/routes/routes.js';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const users = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'Web', 'public', 'upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    console.log(req.user);
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], `${process.env.JWT_SECRET}`, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// my-routes
routes(app);

app.get('/', (req, res) => {
  res.send("Hello😁 Welcome to this API!");
});

// Set a static path to serve uploaded files
app.use('/uploads', express.static(path.join(new URL('Web/public/upload', import.meta.url).pathname)));

const server = http.createServer(app); // Create server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',                   // Allow all origins
        methods: ['GET', 'POST'],
    },
});

// app.get('/', (req, res) => {
//     res.send('Server is running on port 5000');
// });

io.on("connection", (socket) => {                   // Listen to new connection
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {              // Listen to join_room event
        socket.join(data);                           // Make user join the room
        console.log(`User with ID: ${socket.id} joined room: ${data}`);  // Print message in console
    });

    socket.on("send_message", (data) => {                     // Listen to send_message event
        socket.to(data.room).emit("receive_message", data);  // Send message to the room
    });

    socket.on("disconnect", () => {                          // Listen to disconnect event
        console.log("User Disconnected", socket.id);
    });
});

app.listen(config.port, () => {
  console.log(`Server is running on ${config.url}`);
});
