import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { IAssessment } from "../types/interfaces";

interface AssessmentCreationAttributes extends Optional<IAssessment, "id"> {}

class Assessment
  extends Model<IAssessment, AssessmentCreationAttributes>
  implements IAssessment
{
  public id!: number;
  public userId!: number;
  public totalScore!: number;
  public averageScore!: number;
  public category!: string;
  public categoryScores!: {
    [key: string]: {
      score: number;
      average: number;
    };
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assessment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    averageScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Beginner",
    },
    categoryScores: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Assessment",
    tableName: "assessments",
    timestamps: true,
  }
);

export default Assessment;
