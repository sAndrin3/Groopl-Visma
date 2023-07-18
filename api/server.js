import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import routes from './src/routes/routes.js';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
});

//setup cors
app.use(cors({
    origin: "http://localhost:5173"
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

app.listen(config.port, () => {
    console.log(`Server is running on ${config.url}`);
});
