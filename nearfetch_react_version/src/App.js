import './App.css';
import React, { Component } from 'react';
import Header from "./component/header.js";
import Main from "./component/main.js";
import Footer from "./component/footer.js";







class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}
           
export default App;
