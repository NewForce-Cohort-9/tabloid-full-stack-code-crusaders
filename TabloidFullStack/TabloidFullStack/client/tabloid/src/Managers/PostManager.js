const apiUrl = "https://localhost:5001";

//fetch to get list of Posts from the api
export const getAllPosts = () => {
    return fetch(`${apiUrl}/api/Post`) 
      .then((res) => res.json())
  };