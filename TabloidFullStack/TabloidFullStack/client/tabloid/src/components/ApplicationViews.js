import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { PostList } from "./Post/PostList";
import { PostDetails } from "./Post/PostDetails.js";
import { PostCreate } from "./Post/PostCreate.js";
import { PostEdit } from "./Post/PostEdit.js";
import { PostDelete } from "./Post/PostDelete.js";
import { CategoryList } from "./Category/CategoryList.js";
import { CategoryCreate } from "./Category/CategoryCreate.js";
import { CategoryEdit } from "./Category/CategoryEdit.js";
import { CategoryDelete } from "./Category/CategoryDelete.js";
import { TagList } from "./Tag/TagList.js"
import { CreateTag } from "./Tag/CreateTag.js";
import { EditTag } from "./Tag/EditTag.js";
import { DeleteTag } from "./Tag/DeleteTag.js";
import { UsersPostList } from "./Post/UsersPostList.js";
import { CommentList } from "./Comment/ViewPostComments.js";
import { UserProfileList } from "./UserProfile/UserProfileList.js";
import { UserProfileDetails } from "./UserProfile/UserProfileDetails.js";
import { CommentCreate } from "./Comment/CommentCreate.js";
import { EditUserType } from "./UserProfile/EditUserType.js";

export default function ApplicationViews() {
  const userTypeId = localStorage.getItem("userTypeId");

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/post" element={<PostList />} />
        <Route path="post/MyPosts" element={<UsersPostList />}/>
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/comments/:id" element={<CommentList />} />
        <Route path="/comments/add/:id" element={<CommentCreate />} />
        <Route path="/post/add" element={<PostCreate />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
        <Route path="/post/delete/:id" element={<PostDelete />} />
        {userTypeId === "1" && (
        <>
          <Route path="/user" element={<UserProfileList />} />
          <Route path="/user/:id" element={<UserProfileDetails />} />
          <Route path="/user/edit/:id" element={<EditUserType />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/category/add" element={<CategoryCreate />} />
          <Route path="/category/edit/:id" element={<CategoryEdit />} />
          <Route path="/category/delete/:id" element={<CategoryDelete />} />
          <Route path="/tag" element={<TagList />} />
          <Route path="/tag/add" element={<CreateTag />} />
          <Route path="/tag/edit/:id" element={<EditTag />} />
          <Route path="/tag/delete/:id" element={<DeleteTag />} />
        </>
      )}
      </Routes>
   );
 
}