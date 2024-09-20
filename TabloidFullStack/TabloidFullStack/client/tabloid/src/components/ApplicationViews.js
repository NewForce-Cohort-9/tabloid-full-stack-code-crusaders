import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import { CategoryList } from "./Category/CategoryList.js";
import { TagList } from "./Tag/TagList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";
import { CreateTag } from "./Tag/CreateTag.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
        <Route path="/tag" element={<TagList />} />
        <Route path="/tag/add" element={<CreateTag />} />
      </Routes>
   );
 
}