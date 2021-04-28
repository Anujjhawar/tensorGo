module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    guid: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    id: {
      type: type.BIGINT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: type.STRING,
      allowNull: false,
    },
    status: {
      type: type.STRING,
      defaultValue: true,
    },
    isDeleted: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
