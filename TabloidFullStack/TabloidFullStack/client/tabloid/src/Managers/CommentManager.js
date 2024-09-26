const apiUrl = "https://localhost:5001/api/Comment";

// Fetch a list of all comments associated with a Post Id
export const getCommentsByPostId = (id) => {
    return fetch(`${apiUrl}/GetCommentsByPostId/${id}`)
    .then((res) => res.json())
};

// POST method for adding a new comment to database
export const addComment =  (singleComment) => {
    return fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(singleComment)
    });
};

export const deleteComment = (id) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  };