import React from "react";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress = 0, 
  speed = 0, 
  showSpeed = true, 
  className = "",
  size = "md"
}) => {
  const formatSpeed = (bytesPerSecond) => {
    const units = ["B/s", "KB/s", "MB/s", "GB/s"];
    let value = bytesPerSecond;
    let unitIndex = 0;
    
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    
    return `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatTime = (bytesRemaining, speed) => {
    if (speed === 0 || progress >= 100) return "";
    const secondsRemaining = bytesRemaining / speed;
    
    if (secondsRemaining < 60) return `${Math.ceil(secondsRemaining)}s`;
    if (secondsRemaining < 3600) return `${Math.ceil(secondsRemaining / 60)}m`;
    return `${Math.ceil(secondsRemaining / 3600)}h`;
  };

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-300 font-medium">{Math.round(progress)}%</span>
        {showSpeed && speed > 0 && progress < 100 && (
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span>{formatSpeed(speed)}</span>
            <span>•</span>
            <span>{formatTime((100 - progress) * 1024 * 1024 / 100, speed)}</span>
          </div>
        )}
      </div>
      
      <div className={cn("bg-slate-700 rounded-full overflow-hidden", sizes[size])}>
        <div
          className="progress-bar bg-gradient-to-r from-primary to-secondary rounded-full h-full transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;