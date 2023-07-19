import { register, login, logout } from '../controllers/userController.js';
import {getPosts, addPost} from "../controllers/authController.js"

const routes = (app) => {
    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);
         
    app.route('/auth/logout')
        .post(logout);

    app.route('/posts')
        .get(getPosts)
        .post(addPost)
}

export default routes;