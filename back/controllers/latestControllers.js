const Latest = require('../models/latestModels');

exports.createLatest = async (req, res) => {
  try {
    const newLatest = new Latest(req.body);
    const savedLatest = await newLatest.save();
    res.status(201).json(savedLatest);
  } catch (error) {
    res.status(400).json({ message: 'Error occurred while adding new data.' });
  }
};

exports.getLatestById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id); 

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }

    const latestItem = await Latest.findById(id);
    if (!latestItem) {
      return res.status(404).json({ message: 'News item not found.' });
    }

    res.status(200).json(latestItem);
  } catch (error) {
    console.error('Error fetching news:', error); 
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};



exports.getAllLatest = async (req, res) => {
  try {
    const latestItems = await Latest.find();
    res.status(200).json(latestItems);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching all data.' });
  }
};

exports.getLatestById = async (req, res) => {
  try {
    const latestItem = await Latest.findById(req.params.id);
    if (!latestItem) {
      return res.status(404).json({ message: 'Data not found.' });
    }
    res.status(200).json(latestItem);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching the data.' });
  }
};

exports.updateLatest = async (req, res) => {
  try {
    const updatedLatest = await Latest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLatest) {
      return res.status(404).json({ message: 'Data not found.' });
    }
    res.status(200).json(updatedLatest);
  } catch (error) {
    res.status(400).json({ message: 'Error occurred while updating the data.' });
  }
};

exports.deleteLatest = async (req, res) => {
  try {
    const deletedLatest = await Latest.findByIdAndDelete(req.params.id);
    if (!deletedLatest) {
      return res.status(404).json({ message: 'Data not found.' });
    }
    res.status(200).json({ message: 'Data deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while deleting the data.' });
  }
};
