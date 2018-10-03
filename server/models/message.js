"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: DataTypes.STRING,
      status: DataTypes.ENUM("sent")
    },
    {}
  );
  Message.associate = function(models) {
    Message.belongsTo(models.Contact, {
      foreignKey: "sender",
      onDelete: "CASCADE"
    });
    Message.belongsTo(models.Contact, {
      foreignKey: "receiver",
      onDelete: "CASCADE"
    });
  };
  return Message;
};
