
import Feed from "./components/Feed";
import MasonryImageList from "./components/ImageList";
import Navbar from "./components/Navbar";
import Tab from "./components/Tab";
import {useState } from "react";
import FileUpload from "./components/FileUpload";


function App() {
  const [search, setSearch] = useState("");
  return (
    
    <div className="App">
      <Navbar search={search} setSearch={setSearch}/>
      <Feed search={search} setSearch={setSearch} />
      <FileUpload />

    </div>
  );
}

export default App;
