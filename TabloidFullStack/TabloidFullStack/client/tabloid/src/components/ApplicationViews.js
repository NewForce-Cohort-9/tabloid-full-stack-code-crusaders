import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CategoryList } from "./Category/CategoryList.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/category" element={<CategoryList />} />
      </Routes>
   );
 
}