import { useRef } from "react";

const ProfileImageInput = ({ image, handleFileChange }) => {
    const fileInputRef = useRef(null);
  
    const handleImageClick = () => {
      fileInputRef.current.click();
    };
  
    return (
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          src={image}
          className="w-[163px] h-[163px] rounded-full object-cover cursor-pointer"
          onClick={handleImageClick}
          alt="Profile"
        />
      </div>
    );
  };
  
  export default ProfileImageInput;