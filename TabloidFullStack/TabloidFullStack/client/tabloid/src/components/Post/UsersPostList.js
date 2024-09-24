import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export const UsersPostList = () => {
  const [usersPosts, setUsersPosts] = useState([]);
  const userProfileId = JSON.parse(localStorage.getItem("userProfile")).id;

  useEffect(() => {
    getPostsByUserId(userProfileId).then((data) => setUsersPosts(data));
  }, [userProfileId]);

  return (
    <>
    <div className="container pt-5">
        <div>
            <h1>My Posts</h1>
            <Link to="/post/add">
                <Button color="info">
                    Create New Post
                </Button>
            </Link>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {usersPosts.length > 0 && usersPosts.map(post => (
                    <tr key={post.id}>
                        <Post post={post}  /> 
                    </tr>
                ))}
             </tbody>
        </table>
    </div>
</>
  );
};
