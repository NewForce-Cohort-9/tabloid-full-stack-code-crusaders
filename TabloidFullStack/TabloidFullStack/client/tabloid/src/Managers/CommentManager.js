const apiUrl = "https://localhost:5001/api/Comment";

export const getCommentsByPostId = (id) => {
    return fetch(`${apiUrl}/GetCommentsByPostId/${id}`)
    .then((res) => res.json())
}

