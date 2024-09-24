const apiUrl = "https://localhost:5001/api/Post";

//fetch to get list of Posts from the api
export const getAllPosts = () => {
    return fetch(apiUrl) 
      .then((res) => res.json())
  };

  export const getPostById = (id) => {
    return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

  export const addPost = (singlePost) => { 
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singlePost),
    });
  };

  //fetch to get all Posts by User Profile id
  //https://localhost:5001/api/Post/GetUserPostsByUserProfileId/:id
export const getPostsByUserId = (id) => {
  return fetch(`${apiUrl}/GetUserPostsByUserProfileId/${id}`)
  .then((res) => res.json())
}
  // Fetch to add tags with a post
export const addTagsToPost = (postId, tagIds) => {
  return fetch(`${apiUrl}/${postId}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagIds),
  });
};

// Fetch to remove a tag from a post
export const removeTagFromPost = (postId, tagId) => {
  return fetch(`${apiUrl}/${postId}/tags/${tagId}`, {
    method: "DELETE",
  });
};
