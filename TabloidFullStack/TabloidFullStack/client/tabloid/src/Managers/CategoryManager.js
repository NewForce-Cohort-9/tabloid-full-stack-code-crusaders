const apiUrl = "https://localhost:5001";

//fetch to get list of Categories from the api
export const getAllCategories = () => {
    return fetch(`${apiUrl}/api/Category`)
    .then((res) => res.json())
};