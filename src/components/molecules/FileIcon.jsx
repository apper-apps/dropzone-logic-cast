import React from "react";
import ApperIcon from "@/components/ApperIcon";

const FileIcon = ({ type, size = 24, className = "" }) => {
  const getFileIcon = (mimeType) => {
    if (mimeType.startsWith("image/")) return "Image";
    if (mimeType.startsWith("video/")) return "Video";
    if (mimeType.startsWith("audio/")) return "Music";
    if (mimeType.includes("pdf")) return "FileText";
    if (mimeType.includes("word") || mimeType.includes("document")) return "FileText";
    if (mimeType.includes("sheet") || mimeType.includes("excel")) return "FileSpreadsheet";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "Presentation";
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("archive")) return "Archive";
    if (mimeType.includes("text/")) return "FileCode";
    return "File";
  };

  const getIconColor = (mimeType) => {
    if (mimeType.startsWith("image/")) return "text-purple-400";
    if (mimeType.startsWith("video/")) return "text-red-400";
    if (mimeType.startsWith("audio/")) return "text-green-400";
    if (mimeType.includes("pdf")) return "text-red-500";
    if (mimeType.includes("word") || mimeType.includes("document")) return "text-blue-400";
    if (mimeType.includes("sheet") || mimeType.includes("excel")) return "text-emerald-400";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "text-orange-400";
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("archive")) return "text-yellow-400";
    if (mimeType.includes("text/")) return "text-gray-400";
    return "text-slate-400";
  };

  const iconName = getFileIcon(type);
  const iconColor = getIconColor(type);

  return (
    <ApperIcon 
      name={iconName} 
      size={size} 
      className={`${iconColor} ${className}`} 
    />
  );
};

export default FileIcon;