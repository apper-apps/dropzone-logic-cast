import filesData from "../mockData/files.json";

let files = [...filesData];

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