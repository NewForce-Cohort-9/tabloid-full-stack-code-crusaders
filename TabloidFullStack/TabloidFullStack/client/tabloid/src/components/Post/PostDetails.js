import { useEffect, useState } from "react";
import { addTagsToPost, getPostById, removeTagFromPost } from "../../Managers/PostManager.js";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Input, CardImg } from "reactstrap";
import { getAllTags } from "../../Managers/TagManager.js";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({ tags: [] });
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then((postObj) => {
      setPostDetails(postObj);
      // Pre-select the already associated tags
      const tagIds = postObj.tags?.map((tag) => tag.id) || [];
      setSelectedTags(tagIds);
    });
    getAllTags().then(setAllTags);
  }, [id]);
  

  const handleTagChange = (e) => {
    const value = parseInt(e.target.value);

    // If more than one tag is selected, throw an alert
    if (selectedTags.length >= 1 && !selectedTags.includes(value)) {
        alert("You can only select one tag.");
    } else {
        // Toggle tag selection
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(value)
                ? prevSelectedTags.filter((tag) => tag !== value)
                : [...prevSelectedTags, value]
        );
    }
};

const handleSaveTags = () => {
    if (selectedTags.length > 1) {
        alert("Only one tag can be saved at a time.");
        return;
    }

    addTagsToPost(postDetails.id, selectedTags).then(() => {
        window.location.reload(); // Reload to reflect changes
    });
};

  const handleRemoveTag = (tagId) => {
    removeTagFromPost(postDetails.id, tagId).then(() => {
      window.location.reload(); // Reload to reflect changes
    });
  };

  if (!postDetails.id) {
    return <div>No details yet</div>;
  }

  return (
    <>
      <Card className="m-4">
      <CardImg top src={`${postDetails.imageLocation}`} alt={`Image for ${postDetails.title}`} />
      <CardBody>
        <h2 className="text-left px2">{postDetails.title}</h2>
        <hr />
        <p className="text-left px2">Content: {postDetails.content}</p>
        <p className="text-left px2">Published On: {new Date(postDetails.publishDateTime).toLocaleDateString()}</p>
        <p className="text-left px2">
          Posted By: {postDetails.userProfile.displayName}
        </p>
        <p>Tags:</p>
          {postDetails.tags?.map((tag) => (
            <span key={tag.id}>
              {tag.name} 
              <Button color="danger" outline size="sm" onClick={() => handleRemoveTag(tag.id)}>
                Remove
              </Button>
            </span>
          ))}
          <div>
            <h4>Manage Tags</h4>
            {allTags.map((tag) => (
              <div key={tag.id}>
                <Input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={handleTagChange}
                />
                {tag.name}
              </div>
            ))}
            <Button color="success" outline onClick={handleSaveTags}>Save Tags</Button>
          </div>
        <Link to="/post" key="post">
          <Button color="info">Return to Posts</Button>
        </Link>
        <Link to={`/comments/${postDetails.id}`} 
              className="comments-link ml-auto" 
              style={{position: "absolute", right: "1.5rem"}}>
          <Button color="primary">View Comments</Button>
        </Link>
      </CardBody>
      </Card>
    </>
  );
};
