import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";

const SharePanel = ({ files = [], sessionLink = null }) => {
  const [shareLink, setShareLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const completedFiles = files.filter(f => f.status === "completed");
  const totalSize = completedFiles.reduce((sum, file) => sum + file.size, 0);

  useEffect(() => {
    if (sessionLink) {
      setShareLink(sessionLink);
    } else if (completedFiles.length > 0) {
      generateShareLink();
    }
  }, [completedFiles.length, sessionLink]);

  const generateShareLink = async () => {
    if (completedFiles.length === 0) return;

    setIsGenerating(true);
    try {
      // Simulate link generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const link = `https://dropzone.app/share/${Math.random().toString(36).substring(2, 15)}`;
      setShareLink(link);
      toast.success("Share link generated successfully!");
    } catch (error) {
      toast.error("Failed to generate share link");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyShareLink = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        toast.success("Share link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link to clipboard");
      }
    }
  };

  const shareVia = (platform) => {
    if (!shareLink) return;

    const text = `Check out these files I uploaded: ${shareLink}`;
    const urls = {
      email: `mailto:?subject=Shared Files&body=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent("Check out these files!")}`
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank");
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

  if (completedFiles.length === 0) {
    return (
      <Card className="p-6" hover={false}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600/50 to-slate-700/50 flex items-center justify-center mx-auto">
            <ApperIcon name="Share2" size={24} className="text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Share</h3>
            <p className="text-slate-400">
              Complete your uploads to generate shareable links
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6" hover={false}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold gradient-text-success">
          Share Your Files
        </h2>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <ApperIcon name="Files" size={16} />
          <span>{completedFiles.length} files</span>
          <span>•</span>
          <span>{formatFileSize(totalSize)}</span>
        </div>
      </div>

      {/* Share Link */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Share Link
        </label>
        <div className="flex space-x-3">
          <Input
            value={shareLink}
            readOnly
            placeholder={isGenerating ? "Generating link..." : "Share link will appear here"}
            className="flex-1 bg-slate-800 border-slate-600 text-slate-300"
          />
          <Button
            onClick={copyShareLink}
            disabled={!shareLink || isGenerating}
            variant="success"
          >
            {isGenerating ? (
              <ApperIcon name="Loader2" size={18} className="animate-spin mr-2" />
            ) : (
              <ApperIcon name="Copy" size={18} className="mr-2" />
            )}
            {isGenerating ? "Generating..." : "Copy"}
          </Button>
        </div>
      </div>

      {/* Share Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">
          Share via
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => shareVia("email")}
            disabled={!shareLink}
            className="flex items-center justify-center"
          >
            <ApperIcon name="Mail" size={16} className="mr-2" />
            Email
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => shareVia("twitter")}
            disabled={!shareLink}
            className="flex items-center justify-center"
          >
            <ApperIcon name="Twitter" size={16} className="mr-2" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => shareVia("whatsapp")}
            disabled={!shareLink}
            className="flex items-center justify-center"
          >
            <ApperIcon name="MessageCircle" size={16} className="mr-2" />
            WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => shareVia("telegram")}
            disabled={!shareLink}
            className="flex items-center justify-center"
          >
            <ApperIcon name="Send" size={16} className="mr-2" />
            Telegram
          </Button>
        </div>
      </div>

      {/* Link Settings */}
      <div className="pt-4 border-t border-slate-600 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-slate-300">Link Expiration</h4>
            <p className="text-xs text-slate-500">Links expire after 7 days</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-success">
            <ApperIcon name="Clock" size={14} />
            <span>Active</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-slate-300">Download Protection</h4>
            <p className="text-xs text-slate-500">Files are securely hosted</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-success">
            <ApperIcon name="Shield" size={14} />
            <span>Protected</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SharePanel;