import { useEffect, useState } from "react";
import {
  addTagsToPost,
  getPostById,
  removeTagFromPost,
} from "../../Managers/PostManager.js";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, Input, CardImg } from "reactstrap";
import { getAllTags } from "../../Managers/TagManager.js";
import { getReactionsForPost, addPostReaction, removePostReaction } from "../../Managers/PostReactionManager";

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({ tags: [] });
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [userReaction, setUserReaction] = useState(null); //up, down or null
  const { id } = useParams();
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  useEffect(() => {
    getPostById(id).then((postObj) => {
      setPostDetails(postObj);
      fetchReactions();
      // Pre-select the already associated tags
      const tagIds = postObj.tags?.map((tag) => tag.id) || [];
      setSelectedTags(tagIds);
    });
    getAllTags().then(setAllTags);
  }, [id]);

  //reaction
  const fetchReactions = () => {
    getReactionsForPost(id).then((data) => {
      setReactions(data);
      //check if the user has already reacted
      const userReactionRecord = data.find(r => r.userProfileId === userProfile.id);
      if (userReactionRecord) {
        setUserReaction(userReactionRecord.reactionId === 1 ? 'up' : 'down'); // 1 is thumbs up and 2 is thumbs down
      }
    });
  };

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

  const handleReaction = (reactionType) => {
    if (!userProfile) {
      alert("You need to be logged in to react.");
      return;
    }
  
    const reactionId = reactionType === 'up' ? 1 : 2; // 1 is thumbs up and 2 is thumbs down
    if (userReaction === reactionType) {
      removePostReaction(postDetails.id, userProfile.id, reactionId)
        .then(() => {
          setUserReaction(null);
          //update reaction count 
          setReactions(prevReactions => 
            prevReactions.map(r => 
              r.id === reactionId 
                ? { ...r, reactionCount: r.reactionCount - 1 } 
                : r
            )
          );
          fetchReactions(); //refresh reactions after removal
        })
        .catch((error) => {
          console.error("Error removing reaction:", error);
          alert("Failed to remove reaction.");
        });
      return;
    }
  
    //handle reaction toggle
    addPostReaction(postDetails.id, reactionId, userProfile.id)
      .then(() => {
        setUserReaction(reactionType);
        fetchReactions(); //refresh reaction count after adding a new reaction
      })
  };
  

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Link to="/post" key="post">
          <Button color="info" className="mt-3">
            Return to Posts
          </Button>
        </Link>
      </div>
      <Card className="m-4">
        <CardImg
          top
          src={`${postDetails.imageLocation}`}
          alt={`Image for ${postDetails.title}`}
        />
        <CardBody>
          <h2 className="text-left px2">{postDetails.title}</h2>
          <hr />
          <p className="text-left px2">Content: {postDetails.content}</p>
          <p className="text-left px2">
            Published On:{" "}
            {new Date(postDetails.publishDateTime).toLocaleDateString()}
          </p>
          <p className="text-left px2">
            Posted By: {postDetails.userProfile.displayName}
          </p>
          <p>Tags:</p>
          {postDetails.tags?.map((tag) => (
            <span key={tag.id}>
              {tag.name}
              <Button
                color="danger"
                outline
                size="sm"
                onClick={() => handleRemoveTag(tag.id)}
              >
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
            {/* Reaction */}
      <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25297.png" 
                alt="Thumbs Up"
                onClick={() => handleReaction('up')}
                style={{ width: '50px', height: '50px', padding: '10px',cursor: 'pointer', opacity: userReaction === 'up' ? 1 : 0.5 }}
              />
              <span>{reactions.find(r => r.id === 1)?.reactionCount}</span>
              
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Jt4fWTTKq-a3g4LAk1FNBRURO87dt5UDjg&s" 
                alt="Thumbs Down"
                onClick={() => handleReaction('down')}
                style={{ width: '50px', height: '50px', padding: '11px',cursor: 'pointer', opacity: userReaction === 'down' ? 1 : 0.5 }}
              />
              <span>{reactions.find(r => r.id === 2)?.reactionCount}</span>
      </div>
            <Link
              to={`/comments/add/${postDetails.id}`}
              className="comments-link ml-auto"
              style={{ position: "absolute", right: "47%" }}
            >
              <Button color="dark" outline>
                Add Comment
              </Button>
            </Link>
            <Link
              to={`/comments/${postDetails.id}`}
              className="comments-link ml-auto"
              style={{ position: "absolute", right: "1.5rem" }}
            >
              <Button color="primary">View Comments</Button>
            </Link>
            <Button color="success" outline onClick={handleSaveTags}>
              Save Tags
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
