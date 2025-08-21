// Mock file data for the file service
const mockFiles = [
  {
    Id: 1,
    name: "Project_Requirements.pdf",
    size: 2457600,
    type: "application/pdf",
    uploadedAt: "2024-01-15T10:30:00Z",
    modifiedAt: "2024-01-15T10:30:00Z",
    url: "/files/project-requirements.pdf",
    thumbnail: null,
    tags: ["document", "requirements"],
    isShared: false,
    uploadedBy: "john.doe@company.com"
  },
  {
    Id: 2,
    name: "Marketing_Banner.jpg",
    size: 1843200,
    type: "image/jpeg",
    uploadedAt: "2024-01-16T14:45:00Z",
    modifiedAt: "2024-01-16T14:45:00Z",
    url: "/files/marketing-banner.jpg",
    thumbnail: "/thumbs/marketing-banner-thumb.jpg",
    tags: ["image", "marketing"],
    isShared: true,
    uploadedBy: "sarah.wilson@company.com"
  },
  {
    Id: 3,
    name: "Financial_Report_Q4.xlsx",
    size: 654320,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadedAt: "2024-01-17T09:15:00Z",
    modifiedAt: "2024-01-17T11:20:00Z",
    url: "/files/financial-report-q4.xlsx",
    thumbnail: null,
    tags: ["spreadsheet", "finance", "report"],
    isShared: false,
    uploadedBy: "mike.johnson@company.com"
  },
  {
    Id: 4,
    name: "Team_Photo_2024.png",
    size: 3245760,
    type: "image/png",
    uploadedAt: "2024-01-18T16:00:00Z",
    modifiedAt: "2024-01-18T16:00:00Z",
    url: "/files/team-photo-2024.png",
    thumbnail: "/thumbs/team-photo-2024-thumb.png",
    tags: ["image", "team", "photo"],
    isShared: true,
    uploadedBy: "emma.davis@company.com"
  },
  {
    Id: 5,
    name: "API_Documentation.docx",
    size: 892160,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    uploadedAt: "2024-01-19T13:30:00Z",
    modifiedAt: "2024-01-20T10:15:00Z",
    url: "/files/api-documentation.docx",
    thumbnail: null,
    tags: ["document", "api", "documentation"],
    isShared: false,
    uploadedBy: "alex.brown@company.com"
  },
  {
    Id: 6,
    name: "Product_Demo.mp4",
    size: 15728640,
    type: "video/mp4",
    uploadedAt: "2024-01-20T11:45:00Z",
    modifiedAt: "2024-01-20T11:45:00Z",
    url: "/files/product-demo.mp4",
    thumbnail: "/thumbs/product-demo-thumb.jpg",
    tags: ["video", "demo", "product"],
    isShared: true,
    uploadedBy: "lisa.garcia@company.com"
  },
  {
    Id: 7,
    name: "Budget_Template.xls",
    size: 245760,
    type: "application/vnd.ms-excel",
    uploadedAt: "2024-01-21T08:20:00Z",
    modifiedAt: "2024-01-21T08:20:00Z",
    url: "/files/budget-template.xls",
    thumbnail: null,
    tags: ["template", "budget", "finance"],
    isShared: false,
    uploadedBy: "david.miller@company.com"
  },
  {
    Id: 8,
    name: "Company_Logo.svg",
    size: 45320,
    type: "image/svg+xml",
    uploadedAt: "2024-01-22T15:10:00Z",
    modifiedAt: "2024-01-22T15:10:00Z",
    url: "/files/company-logo.svg",
    thumbnail: "/thumbs/company-logo-thumb.png",
    tags: ["image", "logo", "brand"],
    isShared: true,
    uploadedBy: "jennifer.taylor@company.com"
  },
  {
    Id: 9,
    name: "Meeting_Notes.txt",
    size: 12480,
    type: "text/plain",
    uploadedAt: "2024-01-23T09:45:00Z",
    modifiedAt: "2024-01-23T14:30:00Z",
    url: "/files/meeting-notes.txt",
    thumbnail: null,
    tags: ["text", "notes", "meeting"],
    isShared: false,
    uploadedBy: "robert.anderson@company.com"
  },
  {
    Id: 10,
    name: "Presentation_Template.pptx",
    size: 1567890,
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    uploadedAt: "2024-01-24T12:00:00Z",
    modifiedAt: "2024-01-24T12:00:00Z",
    url: "/files/presentation-template.pptx",
    thumbnail: "/thumbs/presentation-template-thumb.jpg",
    tags: ["presentation", "template"],
    isShared: true,
    uploadedBy: "maria.rodriguez@company.com"
  },
  {
    Id: 11,
    name: "User_Manual.pdf",
    size: 3678900,
    type: "application/pdf",
    uploadedAt: "2024-01-25T14:20:00Z",
    modifiedAt: "2024-01-25T16:45:00Z",
    url: "/files/user-manual.pdf",
    thumbnail: null,
    tags: ["document", "manual", "user"],
    isShared: false,
    uploadedBy: "james.wilson@company.com"
  },
  {
    Id: 12,
    name: "Audio_Recording.mp3",
    size: 5234567,
    type: "audio/mpeg",
    uploadedAt: "2024-01-26T10:15:00Z",
    modifiedAt: "2024-01-26T10:15:00Z",
    url: "/files/audio-recording.mp3",
    thumbnail: null,
    tags: ["audio", "recording"],
    isShared: false,
    uploadedBy: "amanda.clark@company.com"
  },
  {
    Id: 13,
    name: "Design_Mockups.zip",
    size: 8965432,
    type: "application/zip",
    uploadedAt: "2024-01-27T16:30:00Z",
    modifiedAt: "2024-01-27T16:30:00Z",
    url: "/files/design-mockups.zip",
    thumbnail: null,
    tags: ["archive", "design", "mockups"],
    isShared: true,
    uploadedBy: "kevin.lee@company.com"
  },
  {
    Id: 14,
    name: "Configuration.json",
    size: 23456,
    type: "application/json",
    uploadedAt: "2024-01-28T11:00:00Z",
    modifiedAt: "2024-01-28T13:15:00Z",
    url: "/files/configuration.json",
    thumbnail: null,
    tags: ["config", "json"],
    isShared: false,
    uploadedBy: "stephanie.white@company.com"
  },
  {
    Id: 15,
    name: "Training_Video.avi",
    size: 22345678,
    type: "video/avi",
    uploadedAt: "2024-01-29T09:30:00Z",
    modifiedAt: "2024-01-29T09:30:00Z",
    url: "/files/training-video.avi",
    thumbnail: "/thumbs/training-video-thumb.jpg",
    tags: ["video", "training"],
    isShared: true,
    uploadedBy: "daniel.martinez@company.com"
  }
];

// Create a mutable copy of the mock data
let files = [...mockFiles];

// Utility function to add delay for realistic API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// File Service Implementation
const fileService = {
  // Get all files
  async getAll() {
    await delay(300);
    try {
      return [...files];
    } catch (error) {
      console.error("Error fetching files:", error);
      throw new Error("Failed to fetch files");
    }
  },

  // Get file by ID
  async getById(id) {
    await delay(300);
    try {
      const fileId = parseInt(id);
      if (isNaN(fileId)) {
        throw new Error("Invalid file ID");
      }

      const file = files.find(f => f.Id === fileId);
      if (!file) {
        throw new Error(`File with ID ${fileId} not found`);
      }

      return { ...file };
    } catch (error) {
      console.error(`Error fetching file with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Create new file
  async create(fileData) {
    await delay(300);
    try {
      if (!fileData || !fileData.name) {
        throw new Error("File name is required");
      }

      const newFile = {
        Id: Date.now(), // Generate unique ID
        name: fileData.name,
        size: fileData.size || 0,
        type: fileData.type || "application/octet-stream",
        uploadedAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        url: fileData.url || `/files/${fileData.name}`,
        thumbnail: fileData.thumbnail || null,
        tags: fileData.tags || [],
        isShared: fileData.isShared || false,
        uploadedBy: fileData.uploadedBy || "unknown@company.com",
        ...fileData
      };

      files.push(newFile);
      return { ...newFile };
    } catch (error) {
      console.error("Error creating file:", error.message);
      throw error;
    }
  },

  // Update existing file
  async update(id, updates) {
    await delay(300);
    try {
      const fileId = parseInt(id);
      if (isNaN(fileId)) {
        throw new Error("Invalid file ID");
      }

      const fileIndex = files.findIndex(f => f.Id === fileId);
      if (fileIndex === -1) {
        throw new Error(`File with ID ${fileId} not found`);
      }

      const updatedFile = {
        ...files[fileIndex],
        ...updates,
        Id: fileId, // Ensure ID doesn't change
        modifiedAt: new Date().toISOString()
      };

      files[fileIndex] = updatedFile;
      return { ...updatedFile };
    } catch (error) {
      console.error(`Error updating file with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Delete file
  async delete(id) {
    await delay(300);
    try {
      const fileId = parseInt(id);
      if (isNaN(fileId)) {
        throw new Error("Invalid file ID");
      }

      const fileIndex = files.findIndex(f => f.Id === fileId);
      if (fileIndex === -1) {
        throw new Error(`File with ID ${fileId} not found`);
      }

      const deletedFile = files.splice(fileIndex, 1)[0];
      return { ...deletedFile };
    } catch (error) {
      console.error(`Error deleting file with ID ${id}:`, error.message);
      throw error;
    }
  }
};

export default fileService;

const fileService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...files];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const file = files.find(f => f.Id === parseInt(id));
    return file ? { ...file } : null;
  },

  async create(fileData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = Math.max(...files.map(f => f.Id), 0) + 1;
    const newFile = {
      Id: newId,
      uploadProgress: 0,
      uploadSpeed: 0,
      status: "uploading",
      url: "",
      thumbnailUrl: null,
      uploadedAt: new Date().toISOString(),
      ...fileData
    };
    files.push(newFile);
    return { ...newFile };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index !== -1) {
      files[index] = { ...files[index], ...updates };
      return { ...files[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index !== -1) {
      const deleted = files.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  },

  async uploadFile(file, onProgress) {
    const createdFile = await this.create({
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading"
    });

    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(async () => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;

        const speed = Math.random() * 2000000 + 500000; // Random speed between 0.5MB/s and 2.5MB/s
        
        await this.update(createdFile.Id, {
          uploadProgress: Math.floor(progress),
          uploadSpeed: speed,
          status: progress === 100 ? "completed" : "uploading",
          url: progress === 100 ? `https://dropzone.app/files/${createdFile.name}` : ""
        });

        if (onProgress) {
          onProgress(Math.floor(progress), speed);
        }

        if (progress >= 100) {
          clearInterval(interval);
          const completedFile = await this.getById(createdFile.Id);
          resolve(completedFile);
        }
      }, 200);
    });
  },

  async generateThumbnail(file) {
    if (file.type.startsWith("image/")) {
      // Simulate thumbnail generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const thumbnailUrl = `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop&crop=center`;
      await this.update(file.Id, { thumbnailUrl });
      return thumbnailUrl;
    }
    return null;
  }
};

export default fileService;