import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DropZone = ({ onFilesSelected, isUploading = false }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      "image/", "video/", "audio/", "text/", "application/pdf",
      "application/msword", "application/vnd.openxmlformats-officedocument",
      "application/vnd.ms-excel", "application/vnd.ms-powerpoint",
      "application/zip", "application/x-rar-compressed"
    ];

    if (file.size > maxSize) {
      toast.error(`File "${file.name}" is too large. Maximum size is 100MB.`);
      return false;
    }

    const isAllowed = allowedTypes.some(type => file.type.startsWith(type));
    if (!isAllowed) {
      toast.error(`File type "${file.type}" is not supported.`);
      return false;
    }

    return true;
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set to false if we're leaving the drop zone completely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
    // Reset input value so same file can be selected again
    e.target.value = "";
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileInput}
        className="hidden"
        accept="image/*,video/*,audio/*,text/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
        disabled={isUploading}
      />
      
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ease-out cursor-pointer
          ${isDragOver ? "drop-zone-active border-primary bg-primary/10 scale-[1.02]" : 
            isDragActive ? "drop-zone-hover border-secondary bg-secondary/5" : 
            "border-slate-600 hover:border-slate-500 bg-surface/20"}
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
          glass-subtle
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Background gradient animation */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 transition-opacity duration-300 ${isDragActive ? "opacity-100" : "opacity-0"}`}></div>
        
        <div className="relative z-10 space-y-6">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver ? "bg-gradient-to-br from-primary to-secondary animate-pulse-glow" :
            isDragActive ? "bg-gradient-to-br from-secondary/20 to-primary/20" :
            "bg-gradient-to-br from-slate-600/50 to-slate-700/50"
          }`}>
            {isUploading ? (
              <div className="animate-spin">
                <ApperIcon name="Loader2" size={32} className="text-primary" />
              </div>
            ) : (
              <ApperIcon 
                name={isDragActive ? "Download" : "Upload"} 
                size={32} 
                className={isDragActive ? "text-primary animate-bounce" : "text-slate-400"} 
              />
            )}
          </div>

          <div className="space-y-3">
            <h3 className={`text-xl font-semibold transition-colors duration-300 ${
              isDragActive ? "gradient-text" : "text-white"
            }`}>
              {isUploading ? "Uploading files..." : 
               isDragOver ? "Drop files here!" :
               isDragActive ? "Release to upload" :
               "Drag & drop files here"}
            </h3>
            
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              {isUploading ? "Please wait while your files are being uploaded" :
               "Or click to browse and select files from your device"}
            </p>
          </div>

          {!isUploading && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
                className="flex items-center justify-center"
                variant="primary"
              >
                <ApperIcon name="FolderOpen" size={18} className="mr-2" />
                Choose Files
              </Button>
              
              <Button
                variant="secondary"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center"
              >
                <ApperIcon name="Camera" size={18} className="mr-2" />
                From Camera
              </Button>
            </div>
          )}

          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 pt-4">
            <div className="flex items-center">
              <ApperIcon name="Shield" size={14} className="mr-1 text-success" />
              Secure
            </div>
            <div className="flex items-center">
              <ApperIcon name="Zap" size={14} className="mr-1 text-warning" />
              Fast Upload
            </div>
            <div className="flex items-center">
              <ApperIcon name="HardDrive" size={14} className="mr-1 text-info" />
              100MB Max
            </div>
          </div>
        </div>

        {/* Animated border effect */}
        {isDragActive && (
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-border animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default DropZone;