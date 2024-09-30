const baseUrl = "https://localhost:5001/api/Reaction";

//https://localhost:5001/api/Reaction/GetReactionsByPostId/1
export const getReactionsByPostId = (postId) => {
  return fetch(`${baseUrl}/GetReactionsByPostId/${postId}`).then((res) =>
    res.json()
  );
};