const apiUrl = "https://localhost:5001/api/Post";

//fetch to get list of Posts from the api
export const getAllPosts = () => {
    return fetch(apiUrl) 
      .then((res) => res.json())
  };

  export const getPostById = (id) => {
    return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

  export const addPost = (singlePost) => { 
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singlePost),
    });
  };