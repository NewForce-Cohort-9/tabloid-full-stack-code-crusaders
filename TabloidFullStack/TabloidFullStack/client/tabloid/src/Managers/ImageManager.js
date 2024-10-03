const apiUrl = "https://localhost:5001/api/AvatarImage";

// Fetching list of avatar images from GetAll() method in C#
export const getAllAvatarImages = () => {
    return fetch(`${apiUrl}`)
    .then((res) => res.json())
};