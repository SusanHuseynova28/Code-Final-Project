const News = require("../models/newsModel");

const getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const newsItem = await News.findOne({ slug });

    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getNewsBySlug };
