import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No files uploaded yet", 
  description = "Drag and drop files here to get started with your uploads",
  actionLabel = "Choose Files",
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 glass-subtle border border-primary/30">
        <ApperIcon name="Upload" size={36} className="text-primary animate-pulse" />
      </div>
      
      <h3 className="text-xl font-semibold gradient-text mb-2">{title}</h3>
      <p className="text-slate-400 mb-8 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-1 gap-3 w-full">
        {onAction && (
          <button
            onClick={onAction}
            className="px-8 py-4 btn-primary text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-lg"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            {actionLabel}
          </button>
        )}
        
        <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 mt-4">
          <div className="flex items-center">
            <ApperIcon name="Shield" size={14} className="mr-1" />
            Secure uploads
          </div>
          <div className="flex items-center">
            <ApperIcon name="Zap" size={14} className="mr-1" />
            Fast transfers
          </div>
          <div className="flex items-center">
            <ApperIcon name="Share2" size={14} className="mr-1" />
            Easy sharing
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg glass-subtle">
        <p className="text-sm text-slate-300 mb-2">
          <ApperIcon name="Info" size={16} className="inline mr-1 text-info" />
          Supported formats
        </p>
        <p className="text-xs text-slate-400">
          Images, Documents, Videos, Archives and more
        </p>
      </div>
    </div>
  );
};

export default Empty;