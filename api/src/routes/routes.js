import { register, login, loginRequired, logout } from '../controllers/userController.js';
import {getPosts, addPost, getComments, addComment, getLikes, addLike, deleteLike, getUser,
getRelationships, addRelationship, deleteRelationship} from "../controllers/authController.js"

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

    app.route('/likes/:postId')
        .get(loginRequired,getLikes)
        .post(addLike)
        .delete(loginRequired,deleteLike)

    app.route('/users/find/:userId')
        .get(getUser)
        
    app.route('/relationships')
        .get(getRelationships)
        .post(addRelationship)
        .delete(deleteRelationship)
}

export default routes;