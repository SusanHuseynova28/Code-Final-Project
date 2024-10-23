// controllers/latestControllers.js
const Latest = require('../models/latestModels');

// 1. Yeni "Latest" məlumatı yarat (CREATE)
exports.createLatest = async (req, res) => {
  try {
    const newLatest = new Latest(req.body);
    const savedLatest = await newLatest.save();
    res.status(201).json(savedLatest);
  } catch (error) {
    res.status(400).json({ message: 'Yeni məlumat əlavə edilərkən xəta.' });
  }
};

// 2. Bütün "Latest" məlumatlarını əldə et (READ - GET ALL)
exports.getAllLatest = async (req, res) => {
  try {
    const latestItems = await Latest.find();
    res.status(200).json(latestItems);
  } catch (error) {
    res.status(500).json({ message: 'Məlumatlar yüklənərkən xəta baş verdi.' });
  }
};

// 3. ID ilə "Latest" məlumatını əldə et (READ - GET BY ID)
exports.getLatestById = async (req, res) => {
  try {
    const latestItem = await Latest.findById(req.params.id);
    if (!latestItem) {
      return res.status(404).json({ message: 'Məlumat tapılmadı.' });
    }
    res.status(200).json(latestItem);
  } catch (error) {
    res.status(500).json({ message: 'Məlumat yüklənərkən xəta.' });
  }
};

// 4. "Latest" məlumatını yenilə (UPDATE)
exports.updateLatest = async (req, res) => {
  try {
    const updatedLatest = await Latest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLatest) {
      return res.status(404).json({ message: 'Məlumat tapılmadı.' });
    }
    res.status(200).json(updatedLatest);
  } catch (error) {
    res.status(400).json({ message: 'Məlumat yenilənərkən xəta.' });
  }
};

// 5. "Latest" məlumatını sil (DELETE)
exports.deleteLatest = async (req, res) => {
  try {
    const deletedLatest = await Latest.findByIdAndDelete(req.params.id);
    if (!deletedLatest) {
      return res.status(404).json({ message: 'Məlumat tapılmadı.' });
    }
    res.status(200).json({ message: 'Məlumat silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Məlumat silinərkən xəta.' });
  }
};
