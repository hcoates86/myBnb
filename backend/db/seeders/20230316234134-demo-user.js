'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jessica',
        lastName: 'Smith',
        email: 'user1@user.io',
        username: 'bestmom',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Noah',
        lastName: 'Smith',
        email: 'user2@user.io',
        username: 'luvtrains17',
        hashedPassword: bcrypt.hashSync('password')
      },
      {//4
        firstName: 'Haskel',
        lastName: 'Smith',
        email: 'user03@aol.com',
        username: 'poppop',
        hashedPassword: bcrypt.hashSync('password')
      },
      {//5
        firstName: 'Sean',
        lastName: 'Smith',
        email: 'userb@user.io',
        username: 'oksure',
        hashedPassword: bcrypt.hashSync('password')
      },
      {//6
        firstName: 'King',
        lastName: 'Smith',
        email: 'king@user.io',
        username: 'woof',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'bestmom', 'luvtrains20', 'poppop', 'oksure', 'woof'] }
    }, {});
  }
};
