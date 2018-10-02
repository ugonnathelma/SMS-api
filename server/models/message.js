"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "SMS",
    {
      message: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    models.Message.belongsTo(models.Contact, {
      foreignKey: {
        allowNull: false
      },
      as: "receiver"
    });

    models.Message.belongsTo(models.Contact, {
      foreignKey: {
        allowNull: false
      },
      as: "sender"
    });
  };
  return Message;
};
