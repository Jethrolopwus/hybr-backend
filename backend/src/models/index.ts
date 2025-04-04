
import sequelize from '../config/database';
import User from './user.models';
import Question from './questions.models';
import Answer from './answer.model';
import Assessment from './assesment.model';

// Define relationships
User.hasMany(Assessment, { foreignKey: 'userId' });
Assessment.belongsTo(User, { foreignKey: 'userId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

Assessment.hasMany(Answer, { foreignKey: 'assessmentId' });
Answer.belongsTo(Assessment, { foreignKey: 'assessmentId' });

export {
  sequelize,
  User,
  Question,
  Answer,
  Assessment
};