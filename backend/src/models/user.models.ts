import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { IUser } from "../types/interfaces";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public company!: string;
  public companySize!: string;
  public industry!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companySize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
