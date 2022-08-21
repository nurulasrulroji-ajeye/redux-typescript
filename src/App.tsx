import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddTodo />} />
        <Route path="edit/:id" element={<EditTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
