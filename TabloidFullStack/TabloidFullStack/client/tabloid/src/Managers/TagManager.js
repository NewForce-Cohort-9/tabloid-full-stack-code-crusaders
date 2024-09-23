const apiUrl = "https://localhost:5001";

//fetch to get list of Tags
export const getAllTags = () => {
    return fetch(`${apiUrl}/api/Tag`)
    .then((res) => res.json())
};

// fetch to add new Tag
export const addTag = (tag) => {
    return fetch(`${apiUrl}/api/Tag`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag)
    });
};

//fetch to edit a Tag
export const editTag = (tag) => {
    return fetch(`${apiUrl}/api/Tag/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag)
    })
}

// fetch to delete a Tag
export const deleteTag = (tagId) => {
    return fetch(`${apiUrl}/api/Tag/${tagId}`, {
        method: "DELETE"
    })
}