const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
    .then((userProfile) => {
      if (userProfile.id && !userProfile.isDeactivated) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        localStorage.setItem("userTypeId", userProfile.userTypeId); // Storing UserTypeId separately
        return userProfile;
      } else if (userProfile.isDeactivated) {
        alert("Your account has been deactivated. Please contact the admin.");
        return undefined;
      } else {
        return undefined;
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject, password) => {
  return  fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};





// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );


//fetch to get list of Users
export const getAllUsers = () => {
  return fetch(`${apiUrl}/api/userprofile`) // Use the correct API path
  .then((res) => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error('Failed to fetch users');
      }
  });
};


// fetch to add new UserProfile
export const addUserProfile = (user) => {
    return fetch(`${apiUrl}/api/userprofile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
};

export const getUserById = (id) => {
  return fetch(`${apiUrl}/api/userprofile/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null; // Return null if there's no valid JSON response
      }
    })
    .catch((error) => {
      console.error("Error fetching user by ID:", error);
      return null;
    });
  };
  
  export const getUserByType = (UserType) => {
    return fetch(`${apiUrl}/api/userprofile/${UserType}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching user by UserType:", error);
      return null;
    });
  };

export const deactivateUser = (id) => {
  return fetch(`${apiUrl}/api/userprofile/deactivate/${id}`, {
      method: "PUT"
  });
};

export const reactivateUser = (id) => {
  return fetch(`${apiUrl}/api/userprofile/reactivate/${id}`, {
      method: "PUT"
  });
};

export const getDeactivatedUsers = () => {
  return fetch(`${apiUrl}/api/userprofile/deactivated`).then(res => res.json());
};

export const editUserType = (userProfile) => {
  return fetch(`${apiUrl}/api/userprofile/${userProfile.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile) // Send the userProfile in the body
  });
};

export const getAdminCount = () => {
  return fetch(`${apiUrl}/api/userprofile/admincount`) // Adjust this API endpoint as per your backend
    .then((res) => res.json());
};


