const express = require("express");
const { getNewsBySlug } = require("../controllers/newsController");

const router = express.Router();


router.get("/:slug", getNewsBySlug);

module.exports = router;
