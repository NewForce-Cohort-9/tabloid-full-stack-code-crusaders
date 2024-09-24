import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Form, Input, Col, Label } from "reactstrap";
import { addPost, getPostById } from "../../Managers/PostManager.js";
import { getAllCategories } from "../../Managers/CategoryManager.js"

export const PostCreate = () => {
    const [post, setPost] = useState({});
    const [postCategories, setPostCategories] = useState([]);
    const { id } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   getPostById(id).then((postObj) => setPost(postObj));
  // }, [id]);

  useEffect(() => {
    getAllCategories().then(categoryArr => setPostCategories(categoryArr))
}, []);

  const createPostObj = () => {
    let user = localStorage.getItem("userProfile")
    const parsedUser = JSON.parse(user)
    
    let postCopy = {...post}
    postCopy.UserProfileId = parsedUser.id
    postCopy.IsApproved = true

    addPost(postCopy).then((p) => {
              navigate("/Post");
            });
    }

  return (
    <div className="create-container">
      <h1>Add New Post</h1>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Label for="imageLocation">Image URL</Label>
            <Input
                id="imageLocation"
                type="text"
                placeholder="Header Image URL"
                onChange={(e) => {
                    let postObj = {...post}
                    postObj.ImageLocation = e.target.value
                    setPost(postObj)
                }}
            />
            <Label for="title">Title</Label>
            <Input
              id="post"
              type="text"
              placeholder="Post Title"
              onChange={(e) => {
                let postObj = {...post}
                postObj.Title = e.target.value
                setPost(postObj)}}
            />
            <Label for="category">Select Post Category</Label>
            <br />
            <select name="categories" id="createPostCategories" 
                onChange={(e) => {
                    let copy = {...post}
                    copy.categoryId = e.target.value
                    setPost(copy)
                    }}>
                <option selected>Select Post Category:</option>
                    {postCategories.map(category => {
                        return <option value={`${category.id}`} >
                            {category.name}
                        </option>
                    })}
            </select>
            <br />
            <Label for="content">Content</Label>
            <Input
                id="content"
                type="text"
                placeholder="Post Content"
                onChange={(e) => {
                    let postObj = {...post}
                    postObj.Content = e.target.value
                    setPost(postObj)
                }}
            />
            <br />
            <Button color="info" onClick={() => createPostObj()}>
              Submit
            </Button>
            <Link to="/post" key="post">
                <Button color="info bg-info-subtle">Return to Posts</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
