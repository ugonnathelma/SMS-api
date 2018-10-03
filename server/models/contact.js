"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Phone number already exists"
        },
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Contact.associate = function(models) {
    Contact.hasMany(models.Message, {
      foreignKey: "sender"
    });
    Contact.hasMany(models.Message, {
      foreignKey: "receiver"
    });
  };
  return Contact;
};
