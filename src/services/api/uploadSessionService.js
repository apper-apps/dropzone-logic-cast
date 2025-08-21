// ApperClient-based Upload Session Service for upload_session_c table
const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'upload_session_c';

// Delay utility for realistic API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadSessionService = {
  async getAll() {
    try {
      await delay(200);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "files_c" } },
          { field: { Name: "total_size_c" } },
          { field: { Name: "share_link_c" } },
          { field: { Name: "expires_at_c" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upload sessions:", error?.response?.data?.message);
      } else {
        console.error("Error fetching upload sessions:", error);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      await delay(150);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "files_c" } },
          { field: { Name: "total_size_c" } },
          { field: { Name: "share_link_c" } },
          { field: { Name: "expires_at_c" } }
        ]
      };

      const response = await apperClient.getRecordById(TABLE_NAME, id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching upload session with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching upload session with ID ${id}:`, error);
      }
      throw error;
    }
  },

  async create(sessionData = {}) {
    try {
      await delay(300);
      
      // Generate share link and expiration date
      const shareLink = `https://dropzone.app/share/${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

      // Only include Updateable fields in create operation
      const createData = {
        Name: sessionData.Name || `Upload Session ${new Date().toLocaleDateString()}`,
        Tags: sessionData.Tags || "",
        files_c: sessionData.files_c || "", // MultiPicklist format
        total_size_c: sessionData.total_size_c || 0,
        share_link_c: sessionData.share_link_c || shareLink,
        expires_at_c: sessionData.expires_at_c || expiresAt.toISOString()
      };

      const params = {
        records: [createData]
      };

      const response = await apperClient.createRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create upload session ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) console.error(record.message);
          });
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating upload session:", error?.response?.data?.message);
      } else {
        console.error("Error creating upload session:", error);
      }
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      await delay(250);
      
      // Only include Updateable fields in update operation
      const allowedFields = ['Name', 'Tags', 'files_c', 'total_size_c', 'share_link_c', 'expires_at_c'];
      const filteredData = { Id: id };
      
      Object.keys(updateData).forEach(key => {
        if (allowedFields.includes(key)) {
          filteredData[key] = updateData[key];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update upload session ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`);
            });
            if (record.message) console.error(record.message);
          });
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating upload session:", error?.response?.data?.message);
      } else {
        console.error("Error updating upload session:", error);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await delay(200);
      
      const params = {
        RecordIds: Array.isArray(id) ? id : [id]
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete upload session ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }

        return successfulDeletions.length === params.RecordIds.length;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting upload session:", error?.response?.data?.message);
      } else {
        console.error("Error deleting upload session:", error);
      }
      throw error;
    }
  }
};

export default uploadSessionService;