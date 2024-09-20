import { useState, useEffect } from "react";
import { Post } from "./Post";
import { getAllPosts } from "../../Managers/PostManager";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

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
      <h2>Posts</h2>
      <div>
        <Link to="/post/add" key="post name">
          <Button color="info">Add New Post</Button>
        </Link>
      </div>
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
