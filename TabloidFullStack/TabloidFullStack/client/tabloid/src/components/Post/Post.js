import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <h2>
          <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
          </Link>
        </h2>
        <p>{new Date(post.publishDateTime).toLocaleDateString()}</p>
        <p>Category: <em>{post.category.name}</em></p>
        <p>Posted by: {post.userProfile?.displayName}</p>
        <Link to={`/post/edit/${post.id}`} key="post name">
          <Button color="primary" outline size="sm">Edit</Button>
        </Link>
        <Link to={`/post/delete/${post.id}`} key="post name">
          <Button color="success" outline size="sm">Delete</Button>
        </Link>
        </CardBody>
    </Card>
  );
};