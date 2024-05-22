/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main_page from "./Page/Main_page";
import Cart_page from "./Page/Cart_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main_page/>}></Route>
        <Route exact path="/cart" element={<Cart_page/>}></Route>
        <Route exact redirect="/" element={<Main_page/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
