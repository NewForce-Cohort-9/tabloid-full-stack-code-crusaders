import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../Managers/CategoryManager.js"
import { editPost, getAllPosts } from "../../Managers/PostManager.js"
import { Button, Form, Col, Input, Label, Row } from "reactstrap"

export const PostEdit = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [postCategories, setPostCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then((posts) => {
          const postToEdit = posts.find(
            (post) => post.id === parseInt(id)
          );
            setPost(postToEdit);
        });
      }, [id]);

    useEffect(() => {
        getAllCategories().then(categoryArr => setPostCategories(categoryArr))
    }, [])

    const editPostObj = () => {
        let user = localStorage.getItem("userProfile")
        const parsedUser = JSON.parse(user)
        
        let postCopy = {...post}
        postCopy.UserProfileId = parsedUser.id
        postCopy.IsApproved = true
    
        editPost(postCopy).then(() => {
                  navigate("/Post");
                });
        }

    return (
        <>
            <div className="edit-container">
            <h1>Edit Post: {post.title}</h1>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Label for="imageLocation">Image URL</Label>
                        <Input
                            id="editImageLocation"
                            type="text"
                            placeholder={post.imageLocation}
                            onChange={(e) => {
                                let postObj = {...post}
                                postObj.ImageLocation = e.target.value
                                setPost(postObj)
                            }}
                        />
                        <Label for="title">Title</Label>
                        <Input
                        id="editPost"
                        type="text"
                        placeholder={post.title}
                        onChange={(e) => {
                            let postObj = {...post}
                            postObj.Title = e.target.value
                            setPost(postObj)}}
                        />
                        <Label for="category">Select Post Category</Label>
                        <br />
                        <select name="categories" id="editPostCategories" 
                            onChange={(e) => {
                                let copy = {...post}
                                copy.categoryId = e.target.value
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
                        <Label for="content">Content</Label>
                        <Input
                            id="editContent"
                            type="text"
                            placeholder={post.content}
                            onChange={(e) => {
                                let postObj = {...post}
                                postObj.Content = e.target.value
                                setPost(postObj)
                            }}
                        />
                        <br />
                        <Button color="info" onClick={() => editPostObj()}>
                            Submit
                        </Button>
                        <Link to="/post" key="post">
                            <Button color="info bg-info-subtle">Return to Posts</Button>
                        </Link>
                    </Col>
                </Row>
            </Form>
            </div>
        </>
    )
}