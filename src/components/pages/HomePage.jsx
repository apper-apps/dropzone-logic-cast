import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import DropZone from "@/components/organisms/DropZone";
import FileList from "@/components/organisms/FileList";
import SharePanel from "@/components/organisms/SharePanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import fileService from "@/services/api/fileService";
import uploadSessionService from "@/services/api/uploadSessionService";
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import Button from '@/components/atoms/Button';

const HomePage = () => {
const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  
  // Get user and auth methods
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      loadInitialData();
    }
  }, [isAuthenticated]);

  const loadInitialData = async () => {
    try {
      setError(null);
      const [filesData, sessionsData] = await Promise.all([
        fileService.getAll(),
        uploadSessionService.getAll()
      ]);
      
      setFiles(filesData);
      // Use the most recent session or create a new one
      const recentSession = sessionsData[sessionsData.length - 1];
      if (recentSession) {
        setCurrentSession(recentSession);
      }
    } catch (err) {
      setError("Failed to load files. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilesSelected = async (selectedFiles) => {
    setIsUploading(true);
    const uploadPromises = [];

    try {
      // Create new session if none exists
      if (!currentSession) {
        const newSession = await uploadSessionService.create();
        setCurrentSession(newSession);
      }

      for (const file of selectedFiles) {
        const uploadPromise = fileService.uploadFile(file, (progress, speed) => {
          // Update progress in real-time
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.name === file.name ? { ...f, uploadProgress: progress, uploadSpeed: speed } : f
            )
          );
        });

        uploadPromises.push(uploadPromise);
      }

      // Wait for all uploads to complete
      const uploadedFiles = await Promise.all(uploadPromises);
      
      // Generate thumbnails for images
      for (const file of uploadedFiles) {
        if (file.type.startsWith("image/")) {
          fileService.generateThumbnail(file);
        }
      }

      // Refresh file list
      const updatedFiles = await fileService.getAll();
      setFiles(updatedFiles);

      toast.success(`Successfully uploaded ${uploadedFiles.length} file${uploadedFiles.length > 1 ? "s" : ""}!`);
    } catch (err) {
      toast.error("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = async (fileId) => {
    try {
      await fileService.delete(fileId);
      setFiles(prevFiles => prevFiles.filter(f => f.Id !== fileId));
    } catch (err) {
      toast.error("Failed to remove file");
      console.error("Remove error:", err);
    }
  };

  const handleRetryUpload = async (fileId) => {
    try {
      const file = files.find(f => f.Id === fileId);
      if (file) {
        // Reset file status and retry upload
        await fileService.update(fileId, { 
          status: "uploading", 
          uploadProgress: 0,
          uploadSpeed: 0 
        });
        
        // Simulate retry process
        const retryFile = { name: file.name, size: file.size, type: file.type };
        await fileService.uploadFile(retryFile, (progress, speed) => {
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.Id === fileId ? { ...f, uploadProgress: progress, uploadSpeed: speed } : f
            )
          );
        });

        // Refresh files
        const updatedFiles = await fileService.getAll();
        setFiles(updatedFiles);
        
        toast.success("File uploaded successfully!");
      }
    } catch (err) {
      toast.error("Retry failed. Please try again.");
      console.error("Retry error:", err);
    }
  };

  const completedFiles = files.filter(f => f.status === "completed");
  const totalSize = completedFiles.reduce((sum, file) => sum + file.size, 0);

  if (loading) {
    return <Loading message="Loading your files..." />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadInitialData}
        details="Check your connection and try again"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      {/* Header */}
      <header className="border-b border-slate-800 bg-surface/30 glass-subtle">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ApperIcon name="Upload" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">DropZone</h1>
                <p className="text-sm text-slate-400">Fast & secure file sharing</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-slate-400">
<div className="flex items-center space-x-2">
                <ApperIcon name="Files" size={16} className="text-success" />
                <span>{files.length} files</span>
              </div>
              {totalSize > 0 && (
                <div className="flex items-center space-x-2">
                  <ApperIcon name="HardDrive" size={16} className="text-info" />
                  <span>{(totalSize / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              )}
              
              {/* User info and logout */}
              <div className="flex items-center space-x-4 ml-auto">
                {user && (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="User" size={16} className="text-primary" />
                    <span className="text-sm text-slate-300">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-slate-300 border-slate-500 hover:bg-slate-700"
                >
                  <ApperIcon name="LogOut" size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Drop Zone */}
        <section>
          <DropZone 
            onFilesSelected={handleFilesSelected}
            isUploading={isUploading}
          />
        </section>

        {/* File List */}
        <section>
          <FileList 
            files={files}
            onRemoveFile={handleRemoveFile}
            onRetryUpload={handleRetryUpload}
          />
        </section>

        {/* Share Panel */}
        <section>
          <SharePanel 
            files={files}
            sessionLink={currentSession?.shareLink}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-surface/20 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} className="text-success" />
                <span>Secure uploads</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" size={16} className="text-warning" />
                <span>Fast transfers</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" size={16} className="text-info" />
                <span>7-day storage</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500">
              © 2024 DropZone. Made with ❤️ for seamless file sharing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;