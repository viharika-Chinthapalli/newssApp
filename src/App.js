// https://newsapi.org/v2/everything?q=apple&from=2023-03-09&to=2023-03-09&sortBy=popularity&apiKey=80daf3f9cca54f09a598ccf4bc147d5e

import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 15;

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="white"
            progress={progress}
            height={3}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News setProgress = {setProgress} key="apple" pageSize={pageSize} category="apple" />
              }
            />
            <Route
              exact
              path="/oppo"
              element={
                <News setProgress = {setProgress} key="oppo" pageSize={pageSize} category="oppo" />
              }
            />
            <Route
              exact
              path="/vivo"
              element={
                <News setProgress = {setProgress} key="vivo" pageSize={pageSize} category="vivo" />
              }
            />
            <Route
              exact
              path="/samsung"
              element={
                <News setProgress = {setProgress}
                  key="samsung"
                  pageSize={pageSize}
                  category="samsung"
                />
              }
            />
            <Route
              exact
              path="/realme"
              element={
                <News setProgress = {setProgress} key="realme" pageSize={pageSize} category="realme" />
              }
            />
            <Route
              exact
              path="/xiaomi"
              element={
                <News setProgress = {setProgress} key="xiaomi" pageSize={pageSize} category="xiaomi" />
              }
            />
            <Route
              exact
              path="/oneplus"
              element={
                <News setProgress = {setProgress}
                  key="oneplus"
                  pageSize={pageSize}
                  category="oneplus"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
}

export default App;
