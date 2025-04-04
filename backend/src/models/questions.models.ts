import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { IQuestion } from "../types/interfaces";

interface QuestionCreationAttributes extends Optional<IQuestion, "id"> {}

class Question
  extends Model<IQuestion, QuestionCreationAttributes>
  implements IQuestion
{
  public id!: number;
  public text!: string;
  public category!: string;
  public maxScore!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: true,
  }
);

export default Question;
