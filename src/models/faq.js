"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class FAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed in the future
    }

    /**
     * Get translated question and answer based on language
     */
    getTranslated(lang) {
      return {
        question:
          lang === "hi"
            ? this.question_hi || this.question
            : lang === "bn"
            ? this.question_bn || this.question
            : this.question,
        answer:
          lang === "hi"
            ? this.answer_hi || this.answer
            : lang === "bn"
            ? this.answer_bn || this.answer
            : this.answer,
      };
    }
  }

  FAQ.init(
    {
      question: { type: DataTypes.STRING, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false }, // Removed "long"
      question_hi: { type: DataTypes.STRING, allowNull: true },
      answer_hi: { type: DataTypes.TEXT, allowNull: true },
      question_bn: { type: DataTypes.STRING, allowNull: true },
      answer_bn: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "FAQ",
      tableName: "FAQs", // Ensuring table name consistency
      timestamps: true, // Enables createdAt & updatedAt
    }
  );

  return FAQ;
};
