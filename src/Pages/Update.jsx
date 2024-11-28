import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/update.css";
import { useState } from "react";

const Update = () => {
  const { id } = useParams();
  const [titlee, settitlee] = useState("");
  const [descr, setdescr] = useState("");
  const [tc, settc] = useState({
    title: "",
    content: "",
  });
  const myToken = localStorage.getItem("token");

  axios
    .get(`https://notes.devlop.tech/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    })
    .then((res) =>
      settc({
        title: res.data.title,
        content: res.data.content,
      })
    );

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
      </div>
    </div>
  );
};

export default Update;
