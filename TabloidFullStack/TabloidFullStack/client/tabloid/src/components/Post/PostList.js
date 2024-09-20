import { useState, useEffect } from "react";
import { Post } from "./Post";
import { getAllPosts } from "../../Managers/PostManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(allPosts => setPosts(allPosts)); 
  };
  

  useEffect(() => {
    getPosts();
  }, []); 

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
    </>
  );
};
