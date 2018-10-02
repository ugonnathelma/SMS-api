"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
