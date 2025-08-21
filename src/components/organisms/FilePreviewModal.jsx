import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilePreviewModal = ({ file, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleCopyLink = async () => {
    if (file.url) {
      try {
        await navigator.clipboard.writeText(file.url);
        toast.success("File link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link to clipboard");
      }
    }
  };

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-surface border border-slate-600 rounded-2xl overflow-hidden max-w-4xl max-h-[90vh] w-full glass shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-white truncate">
                {file.name}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {formatFileSize(file.size)} • {file.type}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4 text-slate-400 hover:text-white"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {file.type.startsWith("image/") ? (
              <div className="flex justify-center">
                <img
                  src={file.url || file.thumbnailUrl}
                  alt={file.name}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    toast.error("Failed to load image");
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="File" size={40} className="text-slate-400" />
                </div>
                <p className="text-slate-400">
                  Preview not available for this file type
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-600 bg-surface/50">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <ApperIcon name="CheckCircle" size={16} className="text-success" />
              <span>Upload completed</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {file.url && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCopyLink}
                >
                  <ApperIcon name="Copy" size={16} className="mr-2" />
                  Copy Link
                </Button>
              )}
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(file.url, "_blank")}
                disabled={!file.url}
              >
                <ApperIcon name="ExternalLink" size={16} className="mr-2" />
                Open
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePreviewModal;