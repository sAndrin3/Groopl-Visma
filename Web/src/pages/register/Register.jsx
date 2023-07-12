import "./register.scss"
import { Link } from "react-router-dom"

function Register() {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Groopl.</h1>
          <p> Welcome to the best social media platform</p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
            
        </div>
        <div className="right">
            <h1>Register</h1>
            <form>
              <input type="text" placeholder="Username"/>
              <input type="text" placeholder="Name"/>
              <input type="email" placeholder="Email"/>
              <input type="password" placeholder="Password"/>
              
              <button>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}


export default Register