"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Contacts",
      [
        {
          first_name: "John",
          last_name: "Doe",
          phone: "+23419033452"
        },
        {
          first_name: "Jane",
          last_name: "Eyre",
          phone: "+2341333452"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('Contacts', null, {});
    
  }
};
