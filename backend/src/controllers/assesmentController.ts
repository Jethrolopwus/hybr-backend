import { Request, Response } from "express";
import { User, Question, Answer, Assessment } from "../models";
import { calculateScores } from "../utils/scoreCalculator";

interface UserData {
  name: string;
  email: string;
  company: string;
  industry: string;
  companySize: string;
}

interface AssessmentResponses {
  [questionId: string]: number;
}

interface AssessmentPayload {
  userData: UserData;
  responses: AssessmentResponses;
}

/**
 * Handles assessment submission with user creation/validation
 */
export const submitAssessment = async (
  req: Request, 
  res: Response
): Promise<void> => {
  try {
    const { userData, responses }: AssessmentPayload = req.body;

    // Validate request data
    if (!userData || !userData.email || !responses || Object.keys(responses).length === 0) {
      res.status(400).json({
        success: false,
        message: "Invalid request data. User data with email and responses are required."
      });
      return;
    }

    // Check if user already exists by email
    let user = await User.findOne({ where: { email: userData.email } });
    
    // Create new user if doesn't exist
    if (!user) {
      user = await User.create({
        name: userData.name,
        email: userData.email,
        company: userData.company,
        industry: userData.industry,
        companySize: userData.companySize
      });
      console.log(`Created new user with ID: ${user.id}`);
    } else {
      console.log(`Found existing user with ID: ${user.id}`);
    }

    // Format responses for processing
    const formattedResponses = Object.entries(responses).map(([questionId, value]) => ({
      questionId: parseInt(questionId),
      value: value
    }));

    // Get all question IDs from responses
    const questionIds = formattedResponses.map(response => response.questionId);

    // Fetch all questions involved
    const questions = await Question.findAll({
      where: { id: questionIds }
    });

    if (questions.length !== questionIds.length) {
      res.status(400).json({
        success: false,
        message: "One or more questions not found"
      });
      return;
    }

    // Calculate scores
    const scoreResults = await calculateScores(formattedResponses, questions);

    // Create a new assessment
    const assessment = await Assessment.create({
      userId: user.id,
      totalScore: scoreResults.totalScore,
      averageScore: scoreResults.averageScore,
      category: scoreResults.category,
      categoryScores: scoreResults.categoryScores
    });

    // Create answers linked to this assessment
    const answerRecords = await Promise.all(
      formattedResponses.map(response =>
        Answer.create({
          value: response.value,
          questionId: response.questionId,
          assessmentId: assessment.id
        })
      )
    );

    res.status(201).json({
      success: true,
      message: user.id ? 'User created and assessment saved' : 'Assessment saved for existing user',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        industry: user.industry,
        companySize: user.companySize
      },
      assessment: {
        id: assessment.id,
        userId: assessment.userId,
        totalScore: assessment.totalScore,
        averageScore: assessment.averageScore,
        category: assessment.category,
        categoryScores: assessment.categoryScores,
        createdAt: assessment.createdAt
      }
    });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message
    });
  }
};

/**
 * Get assessment by ID with related user and answers
 */
export const getAssessment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "company", "industry", "companySize"]
        },
        {
          model: Answer,
          include: [
            {
              model: Question,
              attributes: ["id", "text", "category", "maxScore"]
            }
          ]
        }
      ]
    });

    if (!assessment) {
      res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      assessment
    });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message
    });
  }
};

// Example payload structure for testing
/*
const payload = {
  "userData": {
    "name": "Jethro Lopwus",
    "email": "lopwusjethro92@gmail.com",
    "company": "DELAR",
    "industry": "healthcare",
    "companySize": "1-10"
  },
  "responses": {
    "1": 4,
    "2": 5,
    "3": 5,
    "4": 4,
    "5": 3,
    "6": 3,
    "7": 3,
    "8": 4
  }
};
*/