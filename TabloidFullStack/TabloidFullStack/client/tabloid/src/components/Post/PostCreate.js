import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Form, Input, Col, Label } from "reactstrap";
import { addPost } from "../../Managers/PostManager.js";
import { getAllCategories } from "../../Managers/CategoryManager.js"

export const CategoryCreate = () => {
    const [postCategories, setPostCategories] = useState([]);
    const [userProfileId, setUserProfileId] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(categoryArr => setPostCategories(categoryArr))
}, [])

if (!postCategories.length > 0) {
    return <div>No Data Yet!</div>
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
        imageLocation,
        title,
        content,
        userProfileId: +userProfileId,
    };
    addPost(newPost).then((c) => {
      navigate("/Post");
    });
  };

  return (
    <div className="create-container">
      <h1>Add New Post</h1>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Label for="userId">User Id (For Now...)</Label>
            <Input
                id="userId"
                onChange={(e) => setUserProfileId(e.target.value)}
            />
            <Label for="imageLocation">Image URL</Label>
            <Input
                id="imageLocation"
                 onChange={(e) => setImageLocation(e.target.value)}
            />
            <Label for="title">Title</Label>
            <Input
              id="post"
              type="text"
              placeholder="Post Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label for="category">Select Post Category</Label>
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
            <Label for="content">Content</Label>
            <Input
                id="content"
                onChange={(e) => setContent(e.target.value)}
            />
          </Col>
          <Col>
            <Button color="info" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
