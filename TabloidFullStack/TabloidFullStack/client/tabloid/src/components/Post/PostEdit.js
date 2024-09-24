import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { editPost, getAllPosts } from "../../Managers/PostManager.js"
import { Button, Form, Col, Input, Label, Row } from "reactstrap"

export const PostEdit = () => {
    const { id } = useParams();
    const [postCategories, setPostCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [post, setPost] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then((posts) => {
          const postToEdit = posts.find(
            (post) => post.id === parseInt(id)
          );
            setPost(postToEdit);
        });
      }, [id]);
    
      const handleSave = (e) => {
        e.preventDefault();
        const updatePost = {
          id: parseInt(id),
          title,
          content,
          imageLocation
        };
        editPost(updatePost).then(() => {
          navigate("/Post");
        });
      };

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    return (
        <>
            <div className="create-container">
            <h1>Edit Post: {post.title}</h1>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Label for="addPostTitle">Edit Title</Label>
                        <Input id="addPostTitle"
                        placeholder={post.title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }} value={title}>
                        </Input>
                        <br />
                        <Label for="addPostContent">Content</Label>
                        <Input id="addPostContent" 
                        placeholder={post.content}
                        onChange={(e) => {
                            setContent(e.target.value)
                            }}value={content}>
                        </Input>
                        <br/>
                        <Label for="addPostImageLocation">Image Url</Label>
                        <Input id="addPostImageLocation" 
                        onChange={(e) => {
                            setImageLocation(e.target.value)
                        }} value={imageLocation}>
                        </Input>
                        <br/>
                        <select name="categories" id="createPostCategories" 
                            onChange={(e) => {
                                let copy = {...post}
                                copy.categoryId = parseInt(e.target.value)
                                setPost(copy)
                            }}>
                            <option>Select New Post Category:</option>
                            {postCategories.map(category => {
                                if (post.categoryId === category.id) {
                                    return <option value={`${category.id}`} selected>{category.name}</option>
                                } else {
                                    return <option value={`${category.id}`} >{category.name}</option>
                                }
                            })}
                        </select>
                        <br />
                        <Button id="submitNewPost" type="submit" 
                        onClick={(e) => handleSave(e)}>
                            Update Post!
                        </Button>
                        <br/>
                        <Link to={`/post`}>Back to Post List</Link>
                    </Col>
                </Row>
            </Form>
            </div>
        </>
    )
}