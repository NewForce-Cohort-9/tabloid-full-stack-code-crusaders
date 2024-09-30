const baseUrl = "https://localhost:5001/api/PostReaction";

export const getReactionsForPost = (postId) => {
  return fetch(`${baseUrl}/post/${postId}`)
    .then(res => {
      return res.json();
    });
};

export const addPostReaction = (postId, reactionId, userProfileId) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      reactionId,
      userProfileId,
    }),
  }).then((res) => {
    return res.json();
  });
};

export const removePostReaction = (postId, userProfileId, reactionId) => {
  return fetch(`${baseUrl}/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      userProfileId,
      reactionId,
    }),
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to remove reaction');
    }
    //if response has no body, don't need to parse it as JSON
    return res.status === 204 ? null : res.json(); //204 No Content means no body
  });
};