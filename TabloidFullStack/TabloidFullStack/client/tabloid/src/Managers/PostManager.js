const apiUrl = "https://localhost:5001/api/Post";

//fetch to get list of Posts from the api
export const getAllPosts = () => {
    return fetch(apiUrl) 
      .then((res) => res.json())
  };

  export const getPostById = (id) => {
    return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

//fetch to add new Post to database
  export const addPost = (singlePost) => { 
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singlePost),
    });
  };

  //fetch to edit a Post
export const editPost = (post) => {
    return fetch(`${apiUrl}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}

// fetch to delete a Post
export const deletePost = (postId) => {
    return fetch(`${apiUrl}/${postId}`, {
        method: "DELETE"
    })
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

// Fetch to search posts by tag
export const getSearchedPostsByTag = (q) => {
  return fetch(`${apiUrl}/search?q=${q}`) 
    .then((res) => res.json())
};
