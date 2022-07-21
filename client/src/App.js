import { createContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";

import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import Register from "./components/Register";

export const GlobalContext = createContext();


function App() {
  
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const context = {
    user,
    setUser
  };

  return (
    <div className="App">
      <GlobalContext.Provider value={context}>
        <BrowserRouter>
          <Navbar search={search} setSearch={setSearch} />
          <Routes>

            <Route exact path="/" element={<Feed search={search} setSearch={setSearch} />} />

            <Route path="/fileUpload" element={<FileUpload />} />
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< Register />} />

          </Routes>

        </BrowserRouter>
      </GlobalContext.Provider>
    </div>

  );
}

export default App;
