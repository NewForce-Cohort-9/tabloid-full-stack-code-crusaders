import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CategoryList } from "./Category/CategoryList.js";
import { TagList } from "./Tag/TagList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
        <Route path="/tag" element={<TagList />} />
      </Routes>
   );
 
}