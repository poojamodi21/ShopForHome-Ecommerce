import { createContext, useEffect,useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";


import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Dashboard from "./components/DashboardContent";
import Wishlist from "./components/Wishlist";

export const GlobalContext = createContext();


function App() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState({
    name:"",
    isAdmin: false,
    cart : [],
    wishlist : [],
  
  });

  const getUser = async () => {
    const response = await fetch('/getUser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`

      }
    });
    const data = await response.json();
    setUser(data.result);
    console.log(data);
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
            <Route path="/wishlist" element={< Wishlist />} />
            <Route path="/dashboard" element={< Dashboard />} />

          </Routes>

        </BrowserRouter>
      </GlobalContext.Provider>
    </div>

  );
}

export default App;
