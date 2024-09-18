const apiUrl = "https://localhost:5001/api/Category";

//fetch to get list of Categories from the api
export const getAllCategories = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};

//fetch to add new Category to database
export const addCategory = (categories) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categories)
    });
};