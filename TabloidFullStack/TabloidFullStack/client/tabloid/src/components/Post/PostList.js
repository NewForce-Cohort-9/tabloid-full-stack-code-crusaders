import { useState, useEffect } from "react";
import { getAllPosts } from "../Managers/PostManager";
import { Post } from "./Post";
import { Search } from "./Search";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({}); 

  const getPosts = () => {
    getAllPosts().then(allPosts => setPosts(allPosts)); 
  };
  

  useEffect(() => {
    getPosts();
  }, []); 

  return (
    <>
    <Search search={search} setSearch={setSearch} setPosts={setPosts}/>
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
