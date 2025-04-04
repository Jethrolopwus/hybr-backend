import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IAnswer } from '../types/interfaces';

interface AnswerCreationAttributes extends Optional<IAnswer, 'id'> {}

class Answer extends Model<IAnswer, AnswerCreationAttributes> implements IAnswer {
  public id!: number;
  public value!: number;
  public questionId!: number;
  public assessmentId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assessmentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Answer',
  tableName: 'answers',
  timestamps: true
});

export default Answer;