import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result)
        navigate("/login")
      })
      .catch((err) => console.log(err));
  };

  return (
    <form id="form-container" onSubmit={handleSubmit}>
      <legend id="form-header">Sign up</legend>

      <input
        id="name-field"
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        id="email-field"
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        id="password-field"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button>Register</button>

      <Link id="account-question" to="/login">
        Already have an account? <u>Login</u>
      </Link>
    </form>
  );
}

export default Signup;
