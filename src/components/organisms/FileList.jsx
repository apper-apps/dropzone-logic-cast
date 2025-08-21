import React, { useState } from "react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FileThumbnail from "@/components/molecules/FileThumbnail";
import ProgressBar from "@/components/molecules/ProgressBar";
import Empty from "@/components/ui/Empty";
import FilePreviewModal from "./FilePreviewModal";

const FileList = ({ files = [], onRemoveFile, onRetryUpload }) => {
  const [previewFile, setPreviewFile] = useState(null);

  const formatFileSize = (bytes) => {
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unitIndex = 0;
    
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    
    return `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-success";
      case "error": return "text-error";
      case "uploading": return "text-warning";
      default: return "text-slate-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return "CheckCircle";
      case "error": return "XCircle";
      case "uploading": return "Loader2";
      default: return "Clock";
    }
  };

  const handleCopyLink = async (file) => {
    if (file.url) {
      try {
        await navigator.clipboard.writeText(file.url);
        toast.success("File link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link to clipboard");
      }
    }
  };

  const handleRemove = (fileId) => {
    if (onRemoveFile) {
      onRemoveFile(fileId);
      toast.info("File removed from list");
    }
  };

  const handlePreview = (file) => {
    if (file.status === "completed" && file.type.startsWith("image/")) {
      setPreviewFile(file);
    }
  };

  const handleRetry = (fileId) => {
    if (onRetryUpload) {
      onRetryUpload(fileId);
    }
  };

  if (files.length === 0) {
    return (
      <Empty
        title="No files to display"
        description="Upload files using the drop zone above to see them listed here with progress tracking and sharing options."
        actionLabel="Start Uploading"
        onAction={() => document.querySelector('input[type="file"]')?.click()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold gradient-text">
          Uploaded Files ({files.length})
        </h2>
        
        {files.some(f => f.status === "completed") && (
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              const completedFiles = files.filter(f => f.status === "completed");
              const shareText = completedFiles.map(f => f.url).join('\n');
              navigator.clipboard.writeText(shareText);
              toast.success("All file links copied!");
            }}
          >
            <ApperIcon name="Share2" size={16} className="mr-1" />
            Share All
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.Id} className="p-4 animate-bounce-in" hover={false}>
            <div className="flex items-center space-x-4">
              <FileThumbnail 
                file={file} 
                size="lg"
                onClick={() => handlePreview(file)}
              />
              
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white truncate pr-4">
                    {file.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-xs">
                    <ApperIcon 
                      name={getStatusIcon(file.status)} 
                      size={14} 
                      className={`${getStatusColor(file.status)} ${file.status === "uploading" ? "animate-spin" : ""}`} 
                    />
                    <span className={getStatusColor(file.status)} style={{ textTransform: "capitalize" }}>
                      {file.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{formatFileSize(file.size)}</span>
                  <span>{formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}</span>
                </div>
                
                {file.status === "uploading" && (
                  <ProgressBar 
                    progress={file.uploadProgress || 0}
                    speed={file.uploadSpeed || 0}
                    size="sm"
                  />
                )}
                
                <div className="flex items-center space-x-2 pt-2">
                  {file.status === "completed" && file.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyLink(file)}
                    >
                      <ApperIcon name="Copy" size={14} className="mr-1" />
                      Copy Link
                    </Button>
                  )}
                  
                  {file.status === "error" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRetry(file.Id)}
                    >
                      <ApperIcon name="RefreshCw" size={14} className="mr-1" />
                      Retry
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(file.Id)}
                    className="text-slate-400 hover:text-error"
                  >
                    <ApperIcon name="Trash2" size={14} className="mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
};

export default FileList;