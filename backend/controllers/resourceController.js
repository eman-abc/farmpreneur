const Resource = require('../models/Resource');

// Add CRUD operations for resources here

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { title, description, fileUrl, category } = req.body;
    const resource = new Resource({ title, description, fileUrl, category });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Error creating resource', error: err.message });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resources', error: err.message });
  }
};

// Get a single resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resource', error: err.message });
  }
};

// Update resource details
exports.updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(updatedResource);
  } catch (err) {
    res.status(500).json({ message: 'Error updating resource', error: err.message });
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting resource', error: err.message });
  }
};
