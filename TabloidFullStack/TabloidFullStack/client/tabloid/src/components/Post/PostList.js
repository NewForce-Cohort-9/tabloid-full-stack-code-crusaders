import { useState, useEffect } from "react";
import { Post } from "./Post";
import { Search } from "./Search";
import { getAllPosts, getPostsByCategory, getPostsByUserId } from "../../Managers/PostManager";
import { getAllCategories } from "../../Managers/CategoryManager";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { getAllUsers } from "../../Managers/UserProfileManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({});
  const [postCategories, setPostCategories] = useState([]);
  const [postUsers, setPostUsers] = useState([]);

  const getPosts = () => {
    getAllPosts().then(allPosts => setPosts(allPosts)); 
  };

  useEffect(() => {
    getAllCategories().then(categoryArr => setPostCategories(categoryArr))
  }, [])

  useEffect(() => {
    getPosts();
  }, []); 


   // Filter Posts by Category
  const postsByCategory = async (id) => {
    if (id > 0)
    {
      const posts = await getPostsByCategory(id);
      setPosts(posts)
    }
    else
    {
      getPosts()
    }
  }

  // Filter Posts by User
  const userProfileId = JSON.parse(localStorage.getItem("userProfile")).id;

  useEffect(() => {
    getPostsByUserId(userProfileId).then((data) => setPosts(data));
  }, [userProfileId]);

  const postsByUser = async (id) => {
    if (id > 0)
    {
      const posts = await getPostsByUserId(id);
      setPosts(posts)
    }
    else
    {
      getPosts()
    }
  }
  
  useEffect(() => {
    getAllUsers().then(userArr => setPostUsers(userArr))
  }, [])

  // const filterPostsByUser = postUsers.filter(userPosts => posts.includes(post => post.userProfileId === userPosts.id))


 return (
    <>
      <Row>
        <div className="container">
          <div className="row justify-content-center">
            <h2>Posts</h2>
            <Col md={6}>
              <Search search={search} setSearch={setSearch} setPosts={setPosts}/>
            </Col>
            <Col md={6}>
              <select name="categories" id="filterPostCategories" 
                  onChange={(event) => {return postsByCategory(parseInt(event.target.value))}}>
                        <option>Filter by Category:</option>
                            {postCategories.map(category => {
                                return <option value={`${category.id}`} >
                                        {category.name}
                                      </option>
                            })}
              </select>
            </Col>
            <Col md={6}>
              <select name="users" id="filterPostUsers" 
                  onChange={(event) => {return postsByUser(parseInt(event.target.value))}}>
                        <option>Filter by User:</option>
                            {postUsers.map(user => {
                                return <option value={`${user.id}`} >
                                        {user.displayName}
                                      </option>
                            })}
              </select>
            </Col>
            <div>
              <Link to="/post/add">
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
      </Row>
    </>
  ); 
};
