import dotenv from "dotenv";
import app from "./app";
import { sequelize, User, Question, Answer, Assessment } from "./models";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function initializeDatabase() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models with database
    // Note: For production, use migrations instead of sync
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    // Seed questions if needed
    const questionsCount = await Question.count();
    if (questionsCount === 0) {
      const sampleQuestions = [
        {
          text: "How effectively does your organization identify and articulate key business challenges?",
          category: "Problem Identification",
          maxScore: 5,
        },
        {
          text: "How often does your team refine and reframe problems before jumping to solutions?",
          category: "Problem Identification",
          maxScore: 5,
        },
        {
          text: "How frequently does your organization involve diverse stakeholders in problem-identification processes?",
          category: "Problem Identification",
          maxScore: 5,
        },
        {
          text: "To what degree does your company encourage cross-functional collaboration when defining problems?",
          category: "Collaboration",
          maxScore: 5,
        },
        {
          text: "How effectively does your organization engage with customers or end-users to understand their pain points?",
          category: "Customer Focus",
          maxScore: 5,
        },
        {
          text: "How often does your team conduct field research or ethnographic studies to observe problems firsthand?",
          category: "Research",
          maxScore: 5,
        },
        {
          text: "To what extent does your organization use data analytics to identify emerging issues or trends?",
          category: "Data Analytics",
          maxScore: 5,
        },
        {
          text: "How effectively does your company leverage customer feedback channels to spot potential problems?",
          category: "Customer Focus",
          maxScore: 5,
        },
      ];

      await Question.bulkCreate(sampleQuestions);
      console.log("Sample questions have been seeded.");
    }
  } catch (error) {
    console.error("Unable to connect to the database or sync models:", error);
    process.exit(1);
  }
}

// Initialize and start server
initializeDatabase()
  .then(() => {
    app.listen(3001, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database and start server:", error);
  });
