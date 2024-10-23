const NewArrival = require('../models/newarrivalModel');


exports.getNewArrivals = async (req, res) => {
  try {
    const arrivals = await NewArrival.find();
    res.status(200).json(arrivals);
  } catch (error) {
    console.error('Error fetching new arrivals:', error.message);
    res.status(500).json({ message: 'Could not fetch new arrivals.' });
  }
};


exports.createNewArrival = async (req, res) => {
  try {
    const { name, price, salePrice, isOnSale, description, stock, hoverImage, image } = req.body;

    const newArrival = new NewArrival({
      name,
      price,
      salePrice,
      isOnSale,
      hoverImage,
      image,
      description,
      stock,
    });

    const savedArrival = await newArrival.save();
    res.status(201).json(savedArrival);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Error creating product.' });
  }
};


exports.updateNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedArrival = await NewArrival.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedArrival) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(updatedArrival);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Could not update the product.' });
  }
};

exports.deleteNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArrival = await NewArrival.findByIdAndDelete(id);

    if (!deletedArrival) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product successfully deleted.' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Could not delete the product.' });
  }
};
