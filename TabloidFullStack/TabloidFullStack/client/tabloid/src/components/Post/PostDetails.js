import { useEffect, useState } from "react";
import { getPostById } from "../../Managers/PostManager.js";
import { Link, useParams } from "react-router-dom";
import { Card } from "reactstrap";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    getPostById(id).then((postObj) => setPostDetails(postObj));
  }, [id]);

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
        <p className="text-left px2">{postDetails.title}</p>
        <img
          src={`${postDetails.imageLocation}`}
          alt={`Image for ${postDetails.title}`}
        />
        <p className="text-left px2">Content: {postDetails.content}</p>
        <p className="text-left px2">Published On: {postDate}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
      </Card>
      <Link to={`/posts/${id}/comments`}>View Comments</Link>
    </>
  );
};