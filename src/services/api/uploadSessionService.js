import uploadSessionsData from "../mockData/uploadSessions.json";

let uploadSessions = [...uploadSessionsData];

const uploadSessionService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...uploadSessions];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session = uploadSessions.find(s => s.Id === parseInt(id));
    return session ? { ...session } : null;
  },

  async create(sessionData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...uploadSessions.map(s => s.Id), 0) + 1;
    const newSession = {
      Id: newId,
      files: [],
      totalSize: 0,
      shareLink: `https://dropzone.app/share/${Math.random().toString(36).substring(2, 15)}`,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      ...sessionData
    };
    uploadSessions.push(newSession);
    return { ...newSession };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = uploadSessions.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      uploadSessions[index] = { ...uploadSessions[index], ...updates };
      return { ...uploadSessions[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = uploadSessions.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      const deleted = uploadSessions.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  },

  async addFileToSession(sessionId, fileId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session = uploadSessions.find(s => s.Id === parseInt(sessionId));
    if (session && !session.files.includes(parseInt(fileId))) {
      session.files.push(parseInt(fileId));
      return { ...session };
    }
    return null;
  },

  async removeFileFromSession(sessionId, fileId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const session = uploadSessions.find(s => s.Id === parseInt(sessionId));
    if (session) {
      session.files = session.files.filter(id => id !== parseInt(fileId));
      return { ...session };
    }
    return null;
  }
};

export default uploadSessionService;