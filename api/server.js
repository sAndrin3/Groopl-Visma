import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import routes from './src/routes/routes.js';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

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

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//setup cors
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

app.listen(config.port, () => {
  console.log(`Server is running on ${config.url}`);
});
