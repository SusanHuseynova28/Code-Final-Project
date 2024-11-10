const FilterCard = require('../models/filtercardModels');


exports.getPaginatedFilterCards = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 12);
  const sortOption = req.query.sort || 'default';
  const skip = (page - 1) * limit;

 
  let sortCriteria;
  switch (sortOption) {
    case 'bestSelling':
      sortCriteria = { sales: -1 }; 
      break;
    case 'alphabetically':
      sortCriteria = { name: 1 }; 
      break;
    case 'priceHighToLow':
      sortCriteria = { price: -1 }; 
      break;
    case 'priceLowToHigh':
      sortCriteria = { price: 1 }; 
      break;
    case 'dateOldToNew':
      sortCriteria = { createdAt: 1 }; 
      break;
    case 'dateNewToOld':
      sortCriteria = { createdAt: -1 }; 
      break;
    default:
      sortCriteria = {};
  }

  try {
    const filterCards = await FilterCard.find()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const totalItems = await FilterCard.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      filterCards,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching paginated filter cards:", error);
    res.status(500).json({
      message: 'An error occurred while fetching filter cards.',
      error: error.message,
    });
  }
};


exports.getFilterCardById = async (req, res) => {
  try {
    const filterCard = await FilterCard.findById(req.params.id);
    if (!filterCard) {
      return res.status(404).json({ message: 'Filter card not found' });
    }
    res.status(200).json(filterCard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filter card', error });
  }
};


exports.createFilterCard = async (req, res) => {
  try {
    const newFilterCard = new FilterCard(req.body);
    const savedFilterCard = await newFilterCard.save();
    res.status(201).json(savedFilterCard);
  } catch (error) {
    res.status(400).json({ message: 'Error creating filter card', error });
  }
};


exports.updateFilterCard = async (req, res) => {
  try {
    const updatedFilterCard = await FilterCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFilterCard) {
      return res.status(404).json({ message: 'Filter card not found' });
    }
    res.status(200).json(updatedFilterCard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating filter card', error });
  }
};


exports.deleteFilterCard = async (req, res) => {
  try {
    const deletedFilterCard = await FilterCard.findByIdAndDelete(req.params.id);
    if (!deletedFilterCard) {
      return res.status(404).json({ message: 'Filter card not found' });
    }
    res.status(200).json({ message: 'Filter card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting filter card', error });
  }
};
