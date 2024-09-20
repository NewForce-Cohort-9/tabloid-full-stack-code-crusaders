import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import { PostDetails } from "./Post/PostDetails.js";
import { CategoryList } from "./Category/CategoryList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";
import { TagList } from "./Tag/TagList.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
        <Route path="/tag" element={<TagList />} />
      </Routes>
   );
 
}