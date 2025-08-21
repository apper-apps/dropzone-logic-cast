import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import FileIcon from "./FileIcon";

const FileThumbnail = ({ file, size = "md", onClick }) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40
  };

  const isImage = file.type.startsWith("image/");
  const hasThumbnail = file.thumbnailUrl && !imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(file);
    }
  };

  if (isImage && hasThumbnail) {
    return (
      <div 
        className={`${sizes[size]} rounded-lg overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg`}
        onClick={handleClick}
      >
        <img
          src={file.thumbnailUrl}
          alt={file.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <div 
      className={`${sizes[size]} rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg`}
      onClick={handleClick}
    >
      <FileIcon type={file.type} size={iconSizes[size]} />
    </div>
  );
};

export default FileThumbnail;