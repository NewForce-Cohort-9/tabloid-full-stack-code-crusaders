import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export const UsersPostList = () => {
  const [posts, setPosts] = useState([]);
  const userProfileId = JSON.parse(localStorage.getItem("userProfile")).id;

  useEffect(() => {
    getPostsByUserId(userProfileId).then((data) => setPosts(data));
  }, [userProfileId]);

  return (
    <>
      <div className="container pt-5">
        <div>
          <h1>My Posts</h1>
          <Link to="/post/add">
            <Button color="info">Create New Post</Button>
          </Link>
        </div>
        <div className="cards-column">
          {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </>
  );
};
