import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";

export const UsersPostList = ({ currentUser }) => {
  const [usersPosts, setUsersPosts] = useState([]);

  const getAndSetAllPosts = async () => {
    getPostsByUserId().then((postArray) => {
      const foundPosts = postArray.filter(
        (post) => post.userId === currentUser.id
      );
      setUsersPosts(foundPosts);
    });
  };

  useEffect(() => {
    getAndSetAllPosts();
  }, [currentUser]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <h2>MY Posts</h2>
          <div className="cards-column">
            {usersPosts.map((post) => (
              <Post key={post.id} post={post} currentUser={currentUser} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
