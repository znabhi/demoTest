const express = require("express");
const { getFAQs, addFAQs, deleteFAQ } = require("../controllers/faqController");
const router = express.Router();

router.get("/", getFAQs);
router.post("/", addFAQs);
router.delete("/:id", deleteFAQ);

module.exports = router;
