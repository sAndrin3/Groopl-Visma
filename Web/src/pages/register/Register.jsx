import "./register.scss"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {

  const[inputs, setInputs] = useState({
    username:"",
    name: "",
    email:"",
    password:"",
  })

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  console.log(inputs)
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
              <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
              <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
              <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
              <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
              
              <button>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}


export default Register