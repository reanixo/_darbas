import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Index() {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((result) => {
        if (result.data) {
          setMessage(result.data);
        } else {
          // setMessage("failed to fetch data");
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="search">
      <div id="button-container">
        <button>
          <a id="navbar-button" href="/login">login</a>
        </button>
        <button>
          <a id="navbar-button" href="/register">register</a>
        </button>
      </div>
      <div className="container text-center">
        <div className="row row-cols-2">
          {message.map((item) => (
            <div key={item._id} className="col">
              name: {item.name} <br />
              description: {item.description} <br />
              price: {item.price}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
