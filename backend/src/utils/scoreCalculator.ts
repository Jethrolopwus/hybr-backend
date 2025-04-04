import {
  IAnswer,
  ICategoryScores,
  IQuestion,
  IScoreResult,
} from "../types/interfaces";

/**
 * Calculate total score, average, and determine user category based on answers
 * @param answers - Array of answer objects with values
 * @param questions - Array of question objects with their categories
 * @returns Results containing totalScore, averageScore, category, and categoryScores
 */
export const calculateScores = async (
  answers: { questionId: number; value: number }[],
  questions: IQuestion[]
): Promise<IScoreResult> => {
  // Group questions by ID for easier reference
  const questionMap: { [key: number]: IQuestion } = questions.reduce(
    (map, question) => {
      map[question.id!] = question;
      return map;
    },
    {} as { [key: number]: IQuestion }
  );

  // Prepare category tracking
  const categories: ICategoryScores = {};
  let totalPoints = 0;
  let totalQuestions = answers.length;

  // Calculate scores by category and total
  answers.forEach((answer) => {
    const question = questionMap[answer.questionId];
    const category = question.category;

    if (!categories[category]) {
      categories[category] = {
        total: 0,
        count: 0,
      };
    }

    categories[category].total += answer.value;
    categories[category].count += 1;
    totalPoints += answer.value;
  });

  // Calculate average overall score
  const averageScore =
    totalQuestions > 0
      ? parseFloat((totalPoints / totalQuestions).toFixed(2))
      : 0;

  // Calculate scores by category
  const categoryScores: { [key: string]: { score: number; average: number } } =
    {};
  Object.keys(categories).forEach((category) => {
    const { total, count } = categories[category];
    categoryScores[category] = {
      score: total,
      average: parseFloat((total / count).toFixed(2)),
    };
  });

  // Determine user category based on average score
  let userCategory: string;
  if (averageScore < 2) {
    userCategory = "Beginner";
  } else if (averageScore < 3.5) {
    userCategory = "Intermediate";
  } else {
    userCategory = "Advanced";
  }

  return {
    totalScore: totalPoints,
    averageScore,
    category: userCategory,
    categoryScores,
  };
};
