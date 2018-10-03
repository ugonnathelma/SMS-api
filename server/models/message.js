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
      foreignKey: {
        name: "sender"
      },
      onDelete: "CASCADE",
      targetKey: "phone"
    });
    Message.belongsTo(models.Contact, {
      foreignKey: {
        name: "receiver"
      },
      onDelete: "CASCADE",
      targetKey: "phone"
    });
  };
  return Message;
};
