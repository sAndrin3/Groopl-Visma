import { register, login, logout } from '../controllers/userController.js';
import {getPosts, addPost, getComments, addComment} from "../controllers/authController.js"

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

    app.route('/comments/:id')
        .get(getComments)
        .post(addComment)
}

export default routes;