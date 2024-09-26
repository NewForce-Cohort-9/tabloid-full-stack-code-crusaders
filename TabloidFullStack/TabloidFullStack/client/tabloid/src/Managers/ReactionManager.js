const apiUrl = "https://localhost:5001/api/Reaction";

//fetch to get list of Reactions
export const getAllReactions = () => {
    return fetch(`${apiUrl}`)
    .then((res) => res.json())
};