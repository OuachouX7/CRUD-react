import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Page.css";
import Loading from "./Loading";
import axios from "axios";
const Right = () => {
  const myToken = localStorage.getItem("token");

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [notes, setnotes] = useState([]);
  const [isclicked, setisclicked] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  const [currid, setcurrid] = useState();
  const [isloading, setisloading] = useState(true);

  const handleDelete = (id, e) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      });
    }
    const par = e.target.parentElement;
    par.closest("tr").remove();
  };

  const handleTitle = (e) => {
    settitle(e.target.value);
  };

  const handleDesc = (e) => {
    setdesc(e.target.value);
  };

  const handleForm = () => {
    setisclicked((prev) => !prev);
  };

  const handleUpdate = (id) => {
    setisupdating(true);
    setcurrid(id);
  };

  const [titlee, settitlee] = useState("");
  const [descr, setdescr] = useState("");

  const settofalse = () => {
    setisupdating(false);
  };

  useEffect(() => {
    if (currid && myToken) {
      axios
        .get(`https://notes.devlop.tech/api/notes/${currid}`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then((res) => console.log(res));
    }
  }, [currid, myToken]);

  const handletitlee = (e) => {
    settitlee(e.target.value);
  };

  const handleContent = (e) => {
    setdescr(e.target.value);
  };

  const handleUpdatee = () => {
    axios.put(
      `https://notes.devlop.tech/api/notes/${currid}`,
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

  const handleAdd = () => {
    if (title && desc) {
      axios.post(
        "https://notes.devlop.tech/api/notes",
        {
          title: title,
          content: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
    }
  };

  const classup = isupdating ? "willupadte" : "willnotupdate";

  useEffect(() => {
    setisloading(true);

    axios
      .get("https://notes.devlop.tech/api/notes", {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setnotes(res.data);
        setisloading(false);
      })
      .catch((err) => console.log(err));
  }, [myToken]);

  const classNamee = isclicked ? "clicked" : "notclicked";

  return (
    <>
      <div className="rightSide">
        <div className="NotesList">
          <h2>Notes List</h2>
          <div className="btns">
            <motion.button
              className="Add"
              onClick={handleAdd}
              whileHover={{
                scale: 1.1,
              }}
            >
              Add New Note
            </motion.button>
            <motion.button
              className="Add"
              onClick={handleForm}
              whileHover={{
                scale: 1.3,
              }}
            >
              <svg
              style={{filter:"invert(100%)"}}
                className={isclicked ? "arrowdown" : "arrowup"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </motion.button>
          </div>
        </div>
        <div className={classNamee}>
          <input
            type="text"
            className="upd"
            onChange={handleTitle}
            placeholder="title"
          />
          <input
            type="text"
            className="upd"
            onChange={handleDesc}
            placeholder="description"
          />
        </div>
        <div className="Notes">
          <table>
            <thead>
              <tr className="thead">
                <th>Id</th>
                <th>title</th>
                <th>content</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr className="trr" key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.title}</td>
                  <td>{note.content}</td>
                  <td>
                    <motion.button
                      whileHover={{
                        scale: 1.3,
                      }}
                      className="Delete"
                      onClick={(e) => handleDelete(note.id, e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.3,
                      }}
                      onClick={() => handleUpdate(note.id)}
                      className="Delete update"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                      </svg>
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="loader">{isloading && <Loading />}</div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          x: 100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 2.5,
        }}
        className="update-container"
      >
        <div className={classup}>
          <div className="title-button">
            <p>Update {currid}</p>
            <button className="Add" onClick={settofalse}>
              <motion.svg
                whileHover={{
                  rotate: 180,
                }}
                style={{ filter: "invert(1)" ,width:"100%",height:"100%"}}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </motion.svg>
            </button>
          </div>
          <br />
          <input
            type="text"
            className="upd"
            onChange={handletitlee}
            placeholder="title"
          />
          <br />
          <input
            type="text"
            className="upd"
            onChange={handleContent}
            placeholder="Content"
          />
          <br />
          <motion.button
          style={{padding:"5px 20px"}}
            whileHover={{
              scale: 1.3,
            }}
            onClick={handleUpdatee}
            className="Update"
          >
            {" "}
            Update{" "}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Right;
