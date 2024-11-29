import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/update.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [titlee, settitlee] = useState("");
  const [descr, setdescr] = useState("");
  const myToken = localStorage.getItem("token");
  
  useEffect(() => {
    axios
      .get(`https://notes.devlop.tech/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => console.log(res));
  }, [id, myToken]);

  const handletitlee = (e) => {
    settitlee(e.target.value);
  };

  const handleContent = (e) => {
    setdescr(e.target.value);
  };

  const handleUpdate = () => {
    axios.put(
      `https://notes.devlop.tech/api/notes/${id}`,
      {
        title: titlee,
        content: descr,
      },
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
  };

  return (
    <div className="update-container">
      <div className="updatee">
        Update {id}
        <br />
        <input type="text" onChange={handletitlee} />
        <br />
        <input type="text" onChange={handleContent} />
        <br />
        <button onClick={handleUpdate} className="Update">
          {" "}
          Update{" "}
        </button>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Update;
