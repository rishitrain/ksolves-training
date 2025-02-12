import React from "react";
import Dashboard from "./components/Dashboard";
import Editor from "./components/Editor";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
