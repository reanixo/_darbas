import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/dashboard");
      if (result.data.status === "success") {
        return result.data;
      } else {
        navigate("/login");
      }
    };

    setMessage(await fetchData());
  }, []);

  return (
    <div>
      <div id="dashboard-container">
        <div className="dashboard-item">
          <a id="add-dish" className="dashboard-item" href="/orders">
            shopping cart
          </a>
        </div>

        {message.isAdmin === true && (
          <a id="add-dish" className="dashboard-item" href="/addDish">
            add new dish
          </a>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
