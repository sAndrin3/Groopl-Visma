import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { apiDomain } from "../../Utils/Utils.jsx";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiDomain}/auth/register`, inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };


  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Groopl.</h1>
          <p>Welcome to the best social media platform</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && <p>{err.error}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
