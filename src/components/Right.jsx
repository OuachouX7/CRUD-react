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
  const [isupdating, setisupdating] = useState(false);
  const [currid, setcurrid] = useState();
  const [isloading, setisloading] = useState(true);
  const [uptitle, setuptitle] = useState("");
  const [upcontent, setUpcontent] = useState("");
  const [loadingUpdate, setloadingUpdate] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id, e) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios.delete(
        `https://notes.devlop.tech/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
        );
        const par = e.target.parentElement;
        par.closest("tr").remove();
    }
  };

  const handleTitle = (e) => {
    settitle(e.target.value);
  };

  const handleDesc = (e) => {
    setdesc(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdate = (id) => {
    setisupdating(true);
    setloadingUpdate(true);
    setcurrid(id);
    axios
      .get(`https://notes.devlop.tech/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setuptitle(res.data.title);
        setUpcontent(res.data.content);
        setloadingUpdate(false);
      })
      .catch((err) => {
        if(err.status === 401){

          alert(err);
          window.location.reload();
        }
      });
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
    axios
      .put(
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
      )
      .then(() => {
          alert("Note Updated Successfully");
          window.location.reload();
        
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(err);
          window.location.reload();
        }
      });
  };

  const handleAdd = () => {
    if (title && desc) {
      axios
        .post(
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
        )
        .then((res) => {
          if (res.status === 201) {
            alert("Note Added Successfully");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
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

  return (
    <>
      <div className="rightSide">
        <div className="NotesList">
          <h2>Notes List</h2>
          <div className="btns">
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              className="add"
              onClick={toggleModal}
            >
              Add Note
            </motion.button>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <motion.div
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="modal"
            >
              <button className="close-btn" onClick={toggleModal}>
                <motion.svg
                  whileHover={{
                    rotate: 180,
                  }}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#000"
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </motion.svg>
              </button>
              <div className="formm">
                <label>Title :</label>
                <input
                  type="text"
                  className="upd"
                  onChange={handleTitle}
                  placeholder="title"
                />
              </div>
              <div className="formm">
                <label>Content :</label>
                <input
                  type="text"
                  className="upd"
                  onChange={handleDesc}
                  placeholder="description"
                />
              </div>
              <motion.button
                className="add"
                onClick={handleAdd}
                whileHover={{
                  scale: 1.1,
                }}
              >
                Add New Note
              </motion.button>
            </motion.div>
          </div>
        )}
        <div className="Notes">
          <table>
            <thead>
              <tr className="thead">
                <th>Id</th>
                <th>title</th>
                <th>content</th>
                <th>date</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {notes.map((note) => (
                <tr className="trr" key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.title}</td>
                  <td>{note.content}</td>
                  <td>{note.date.slice(0, 10)}</td>
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
      {isloading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="update-container">
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
              duration: 3.5,
            }}
            className={classup}
          >
            <div className="headBody">
              <div className="title-button">
                <button className="add" onClick={settofalse}>
                  <motion.svg
                    whileHover={{
                      rotate: 180,
                    }}
                    style={{
                      filter: "invert(1)",
                      width: "100%",
                      height: "100%",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </motion.svg>
                </button>
              </div>
              <div className="formUpdate">
                {loadingUpdate ? (
                  <div className="animationLoading">
                    <Loading />
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      className="upd"
                      onChange={handletitlee}
                      defaultValue={uptitle}
                    />

                    <input
                      type="text"
                      className="upd"
                      onChange={handleContent}
                      defaultValue={upcontent}
                    />
                  </>
                )}

                <motion.button
                  style={{ padding: "5px 20px" }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  onClick={handleUpdatee}
                  className="Update"
                >
                  Update
                </motion.button>
              </div>
            </div>
            <div className="currid">
              <p>Current ID: {currid}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Right;
