import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../Managers/PostManager.js";
import { Post } from "./Post.js";
import { Link } from "react-router-dom";

export const UsersPostList = () => {
  const [usersPosts, setUsersPosts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userProfile")).id;

  useEffect(() => {
    getPostsByUserId(userId).then(data => setUsersPosts(data));
}, [userId]);

return (
    <>
        <header className="masthead bg-primary text-white text-center">
            <div className="container d-flex align-items-center flex-column">
                <div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-line"></div>
                </div>
                <h2 className="pre-wrap font-weight-light mb-0">My Posts</h2>
            </div>
        </header>

        <div className="container pt-5">
            <div className="container d-flex align-items-center justify-content-between w-full">
                <h1>All My Posts</h1>
                <Link to="/posts/create">
                    <button className="btn btn-outline-primary mx-1 text-primary">
                        Create New Post
                    </button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Published On</th>
                        <th>Actions</th> 
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
