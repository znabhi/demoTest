const { FAQ } = require("../models/index");
const axios = require("axios");

const getFAQs = async (req, res) => {
  const lang = req.query.lang || "en";
  const cacheKey = `faqs_${lang}`;

  try {
    const faqs = await FAQ.findAll();

    const translatedFAQs = faqs.map((faq) => faq.getTranslated(lang));
    const formattedFAQs = faqs.map((faq) => faq.get({ plain: true }));

    res.json(formattedFAQs);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch FAQs",
      success: false,
      error,
    });
  }
};

const addFAQs = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required!",
      });
    }

    const translate = async (text, targetLang) => {
      try {
        const response = await axios.get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURI(
            text
          )}`
        );
        return response.data[0][0][0];
      } catch (error) {
        console.error(`Translation Error for ${targetLang}:`, error.message);
        return null;
      }
    };

    const [question_hi, question_bn, answer_hi, answer_bn] = await Promise.all([
      translate(question, "hi"),
      translate(question, "bn"),
      translate(answer, "hi"),
      translate(answer, "bn"),
    ]);

    const faq = await FAQ.create({
      question,
      answer,
      question_hi,
      answer_hi,
      question_bn,
      answer_bn,
    });

    // Store FAQs in Redis cache for fast retrieval
    const cacheKey = `faqs_en`;
    // await redis.del(cacheKey); // Clear cache after update to keep data fresh

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      data: faq,
    });
  } catch (error) {
    console.error("Error adding FAQ:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    await faq.destroy();

    // await redis.del("faqs_en");
    // await redis.del("faqs_hi");
    // await redis.del("faqs_bn");

    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  getFAQs,
  addFAQs,
  deleteFAQ,
};
