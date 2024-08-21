const { DataTypes } = require("sequelize");
const sequelize = require("../Config/dbconnect");
const User = require("../Modal/User");
const GroupMembers = require("../Modal/GroupMembers");

const Group = sequelize.define(
  "Group",
  {
    groupId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    gName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      autoIncrement: false,
    },
  },
  {
    timestamps: true,
  }
);

// Group.hasMany(GroupMembers, { foreignKey: "groupId" });
// GroupMembers.belongsTo(Group, { foreignKey: "groupId" });

// (async () => {
//   try {
//     //   await sequelize.query('DROP TABLE IF EXISTS "Groups" CASCADE;');
//     await Group.sync({ alter: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error syncing group table:", error);
//   }
// })();

module.exports = Group;
