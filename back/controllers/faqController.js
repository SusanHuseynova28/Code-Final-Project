const FAQ = require('../models/faqModel');


const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve FAQs" });
  }
};


const getFAQById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await FAQ.findById(id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving FAQ" });
  }
};


const addFAQ = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: "Failed to add FAQ" });
  }
};


const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    if (!updatedFAQ) return res.status(404).json({ message: "FAQ not found" });
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};


const deleteFAQ = async (req, res) => {
  const { id } = req.params; 
  try {
   
    const deletedFAQ = await FAQ.findByIdAndDelete(id);

   
    if (!deletedFAQ) return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ" });
  }
};

module.exports = { getAllFAQs, getFAQById, addFAQ, updateFAQ, deleteFAQ };
