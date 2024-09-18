import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import { CategoryList } from "./Category/CategoryList.js";
import { TagList } from "./Tag/TagList.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/tag" element={<TagList />} />
      </Routes>
   );
 
}