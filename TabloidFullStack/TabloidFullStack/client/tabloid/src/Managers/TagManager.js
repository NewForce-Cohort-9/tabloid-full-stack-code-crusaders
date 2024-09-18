const apiUrl = "https://localhost:5001";

//fetch to get list of Tags from the api
export const getAllTags = () => {
    return fetch(`${apiUrl}/api/Tag`)
    .then((res) => res.json())
};