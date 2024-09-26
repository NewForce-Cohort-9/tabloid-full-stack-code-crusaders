import React, { useEffect, useState } from "react";

export default function Hello() {
  const [userFName, SetUserFName] = useState(null);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.firstName) {
      SetUserFName(userProfile.firstName)
    }
  }, []);

  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
      fontSize: "32px",
      fontWeight: "bolder",
      textShadow: "2px 2px 6px gray"
    }}>Welcome to Tabloid, {userFName}!</span>
  );
}