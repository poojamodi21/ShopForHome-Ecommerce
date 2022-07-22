import { createContext, useEffect } from "react";
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
import Cart from "./components/Cart";

export const GlobalContext = createContext();


function App() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState({});

  const getUser = async () => {
    const response = await fetch('/getUser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`

      }
    });
    const data = await response.json();
    setUser(data);
  }
  useEffect(() => {

    const token = localStorage.getItem("jwt");
    if (token) {
      getUser();


    }
  }
    , [])


  const context = {
    user,
    setUser
  };

  return (
    <div className="App">
      <GlobalContext.Provider value={context}>
        <BrowserRouter>
          <Navbar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
          />
          <Routes>

            <Route
              exact path="/"
              element={
                <Feed
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  price={price}
                  setPrice={setPrice}

                />
              }
            />

            <Route path="/fileUpload" element={<FileUpload />} />
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< Register />} />
            <Route path="/cart" element={< Cart />} />

          </Routes>

        </BrowserRouter>
      </GlobalContext.Provider>
    </div>

  );
}

export default App;
