'use strict';

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
    options.tableName = 'reviews';
    return queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      userId: 1,
      review: 'Average at best.',
      stars: 3
      },
      {
      spotId: 2,
      userId: 3,
      review: 'sucks',
      stars: 1
      },
      {
      spotId: 3,
      userId: 2,
      review: 'Best evaaaar!!!',
      stars: 5
      },
      {
      spotId: 2,
      userId: 3,
      review: 'a decent place to sleep',
      stars: 3
      },
      {
      spotId: 1,
      userId: 1,
      review: 'it is a place',
      stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'it is a place',
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'it is a place',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'it is a place',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'it is a place',
        stars: 4
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
    options.tableName = 'reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Average at best.', 'sucks', 'Best evaaaar!!!', 'a decent place to sleep', 'it is a place'] }
    }, {});
  }
};
