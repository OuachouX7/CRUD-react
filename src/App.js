import Login from "./components/Login";
import Page from "./components/Page";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./Pages/Update";
import { useState } from "react";

function App() {
  const [isConnected, setisConnected] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {isConnected ? (
          <Page setisConnected={setisConnected} />
        ) : (
          <Login setisConnected={setisConnected} />
        )}
        <Routes>
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
