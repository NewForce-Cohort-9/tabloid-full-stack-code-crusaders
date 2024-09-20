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

//fetch to handle Delete
export const deleteCategory = (id) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  };

  //fetch to handle the Edit
export const updateCategory = (category) => {
    return fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };
  