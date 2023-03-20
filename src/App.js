// import "./App.css";
import { connect, Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import AppRouteing from "./AppRouteing";
import SignIn from "./Component/Sign/SignIn";
import Footer from "./Component/Footer/Footer";
import Tosters from "./Component/Overlays/Tosters";

function App(props) {
  return (
    <div className="App">
      <Tosters />

      <AppRouteing />
      <Footer />
    </div>
  );
}

export default connect((state) => {
  return state;
})(App);
