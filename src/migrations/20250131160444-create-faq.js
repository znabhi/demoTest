"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FAQs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.TEXT, // Removed "long" (not needed in PostgreSQL)
        allowNull: false,
      },
      question_hi: {
        type: Sequelize.STRING, // Hindi translation
        allowNull: true,
      },
      answer_hi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      question_bn: {
        type: Sequelize.STRING, // Bengali translation
        allowNull: true,
      },
      answer_bn: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Create trigger to update 'updatedAt' on row update
    // await queryInterface.sequelize.query(`
    //   CREATE TRIGGER update_faqs_updated_at
    //   BEFORE UPDATE ON "FAQs"
    //   FOR EACH ROW
    //   EXECUTE FUNCTION trigger_set_timestamp();
    // `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FAQs");
  },
};
