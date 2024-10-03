import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Form, Input, Col, Label } from "reactstrap";
import { addPost } from "../../Managers/PostManager.js";
import { getAllCategories } from "../../Managers/CategoryManager.js"

export const PostCreate = () => {
  const [post, setPost] = useState({
    ImageLocation: '',
    Title: '',
    Content: '',
    categoryId: ''
  });
    const [postCategories, setPostCategories] = useState([]);
    // const [userProfileId, setUserProfileId] = useState("");
    // const [imageLocation, setImageLocation] = useState("");
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(categoryArr => setPostCategories(categoryArr))
}, [])

if (!postCategories.length > 0) {
    return <div>No Data Yet!</div>
}

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newPost = {
//         imageLocation,
//         title,
//         content,
//         userProfileId: +userProfileId,
//     };
//     addPost(newPost).then((p) => {
//       navigate("/Post");
//     });
//   };

  const createPostObj = () => {
    let user = localStorage.getItem("userProfile")
    const parsedUser = JSON.parse(user)
    
    const postCopy = {
      ...post,
      UserProfileId: parsedUser.id, // Use the parsed user ID
      CreateDateTime: new Date().toISOString(), // Set create date
      PublishDateTime: new Date().toISOString(), // Set publish date
      IsApproved: true
    };

    addPost(postCopy).then(() => {
              navigate("/Post");
            });
  }

  return (
    <div className="create-container">
      <h1>Add New Post</h1>
      <Form onSubmit={(e) => { e.preventDefault(); createPostObj(); }}>
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
              id="title"
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
                <option>Select Post Category:</option>
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
            <Button color="info" type="submit">
              Submit
            </Button>
            <Link to="/post">
                <Button color="info bg-info-subtle">Return to Posts</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
