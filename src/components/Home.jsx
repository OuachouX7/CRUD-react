import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {motion} from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  const myToken = localStorage.getItem("token");
  const [users, setusers] = useState([]);
  const [noteslen, setnoteslen] = useState([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    setisloading(true);
    axios
      .get(`https://notes.devlop.tech/api/users`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setusers(res.data);
        setisloading(false);
      });
  }, [myToken]);

  useEffect(() => {
    axios
      .get(`https://notes.devlop.tech/api/notes`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => setnoteslen(res.data));
  }, [myToken]);

  return (
    <>
      <motion.div
      initial={{ opacity: 0 , y: 50}}
      animate={{ opacity: 1 , y: 0}}
      transition={{ duration: 0.5 }}
      className="cardsContainer">
        <div className="cardOne">
          <div className="upCard">
            <svg
              className="homeSvg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
            </svg>
            <p>Students</p>
          </div>
          <div className="downCard">
            {isloading ? (
              <div className="animationContainer">
                <Loading />
              </div>
            ) : (
              <p>{users.length + 1}</p>
            )}
          </div>
        </div>
        <div className="cardTwo">
          <div className="upCard">
            <svg
              className="homeSvgg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
            </svg>{" "}
            <p>Notes</p>
          </div>
          <div className="downCard">
            {isloading ? (
              <div className="animationContainer">
                <Loading />
              </div>
            ) : (
              <p>{noteslen.length}</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
