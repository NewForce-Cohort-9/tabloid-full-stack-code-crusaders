import React from "react";
import { useState, useEffect } from "react";
import { getAllAvatarImages } from "../../Managers/ImageManager.js";


export const AvatarImageSelector = ({ onSelect }) => {
    const [avatarImages, setAvatarImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    

    useState(() => {
        getAllAvatarImages().then(imageList =>
        setAvatarImages(imageList));
    }, []);
  
    const handleImageClick = (image) => {
      setSelectedImage(image.imageLocation);
      onSelect(image);
    };
  
    return (
      <div>
        {avatarImages.map((image, index) => (
          <img
            key={index}
            src={image.imageLocation}
            alt={`avatar-${index}`}
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              boxShadow: hoveredIndex === index ? '0.5px 2px 10px blue' : '2px 2px 2px white',
              cursor: 'pointer',
              width: '125px',
              height: '110px',
              margin: '10px'
            }}
          />
        ))}
      </div>
    );
  };