const NewArrival = require('../models/newarrivalModel'); // Import the Mongoose model

// Create a new arrival (POST)
exports.createNewArrivals = async (req, res) => {
  try {
    const {
      name = 'Default Name', // Assign a default name if not provided
      price = 0,             // Assign a default price if not provided
      salePrice = null,
      isOnSale = false,
      description = '',
      stock = 0
    } = req.body;

    // OPTIONAL: Log the incoming data for debugging
    console.log('Incoming data:', req.body);

    // Access hoverImage and images from req.files
    const hoverImageFiles = req.files?.hoverImage;
    const imageFiles = req.files?.images;

    // Ensure that images exist, if not, assign a default
    const imageArray = imageFiles ? imageFiles.map(file => file.filename) : ['default-image.png'];

    // Use the first uploaded hover image if available, otherwise use a default
    const hoverImage = hoverImageFiles?.length ? hoverImageFiles[0].filename : 'default-hover-image.png';

    // Create a new arrival object
    const newArrival = new NewArrival({
      name,
      price,
      salePrice,
      isOnSale,
      images: imageArray,
      hoverImage,
      description,
      stock,
    });

    // Save the product to the database
    const savedArrival = await newArrival.save();

    // Respond with the newly created product
    res.status(201).json(savedArrival);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Error creating product.' });
  }
};


// Get all new arrivals (GET)
exports.getNewArrivals = async (req, res) => {
  try {
    const arrivals = await NewArrival.find(); // Fetch all products
    res.status(200).json(arrivals); // Return the products
  } catch (error) {
    console.error('Error fetching new arrivals:', error.message);
    res.status(500).json({ message: 'Could not fetch new arrivals.' });
  }
};

// Update a new arrival by ID (PUT)
exports.updateNewArrival = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    // If images are uploaded, handle them
    if (req.files) {
      const hoverImage = req.files.hoverImage;
      const images = req.files.images;

      if (hoverImage && hoverImage.length > 0) {
        updates.hoverImage = hoverImage[0].filename; // Update hover image
      }
      if (images && images.length > 0) {
        updates.images = images.map(file => file.filename); // Update images
      }
    }

    const updatedArrival = await NewArrival.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated product
      runValidators: true, // Run schema validators
    });

    if (!updatedArrival) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(updatedArrival);
  } catch (error) {
    console.error('Error updating new arrival:', error.message);
    res.status(500).json({ message: 'Could not update the product.' });
  }
};

// Delete a new arrival by ID (DELETE)
exports.deleteNewArrival = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const deletedArrival = await NewArrival.findByIdAndDelete(id);

    if (!deletedArrival) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product successfully deleted.' });
  } catch (error) {
    console.error('Error deleting new arrival:', error.message);
    res.status(500).json({ message: 'Could not delete the product.' });
  }
};
