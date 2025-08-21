import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, details = null }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-error/20 to-red-600/20 flex items-center justify-center mb-6 glass-subtle border border-error/30">
        <ApperIcon name="AlertTriangle" size={32} className="text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">Upload Error</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{message}</p>
      
      {details && (
        <div className="w-full bg-surface/50 border border-error/20 rounded-lg p-4 mb-6 glass-subtle">
          <p className="text-sm text-slate-300 font-mono">{details}</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 px-6 py-3 btn-primary text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            <ApperIcon name="RefreshCw" size={18} className="mr-2" />
            Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="flex-1 px-6 py-3 bg-surface/80 hover:bg-surface text-slate-300 hover:text-white font-medium rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500/30"
        >
          <ApperIcon name="RotateCcw" size={18} className="mr-2" />
          Refresh Page
        </button>
      </div>
      
      <p className="text-xs text-slate-500 mt-6">
        If the problem persists, please check your internet connection or try again later.
      </p>
    </div>
  );
};

export default Error;