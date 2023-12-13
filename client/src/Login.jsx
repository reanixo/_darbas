import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";;
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          navigate("/dashboard");
        } else {
          document.querySelector("#error-msg").style.display = "block";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form id="form-container" onSubmit={handleSubmit}>
      <legend id="form-header">Login</legend>

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

      <div id="error-msg">Wrong credentials!</div>

      <button>Login</button>

      <Link id="account-question" to="/register">
        Don't have an account? <u>Sign up</u>
      </Link>
    </form>
  );
}

export default Login;
