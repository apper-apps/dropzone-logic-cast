import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading files..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-surface border-t-primary animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-secondary animate-spin animate-reverse" style={{ animationDuration: "0.8s" }}></div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium gradient-text">{message}</p>
        <p className="text-sm text-slate-400">Please wait while we process your request</p>
      </div>

      {/* Skeleton loaders */}
      <div className="w-full max-w-md space-y-3 mt-8">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-surface/30 glass-subtle animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-md w-3/4"></div>
            <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-md w-1/2"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-surface/20 glass-subtle animate-pulse" style={{ animationDelay: "0.1s" }}>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-md w-2/3"></div>
            <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-md w-1/3"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-surface/10 glass-subtle animate-pulse" style={{ animationDelay: "0.2s" }}>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-md w-4/5"></div>
            <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-md w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;