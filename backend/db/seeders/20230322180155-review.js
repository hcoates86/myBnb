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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      userId: 5,
      review: 'The most bathroomiest bathroom you can imagine.',
      stars: 3
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Have to love the throne room.',
        stars: 5
      },
      {
      spotId: 2,
      userId: 3,
      review: 'I dont like it',
      stars: 3
      },
      {
        spotId: 3,
        userId: 5,
        review: 'I used the laptop... :(',
        stars: 2
      },
      {
      spotId: 3,
      userId: 5,
      review: "Owner of spot and I traded spaces at a third party's suggestion... Not uncomfortable.",
      stars: 3
      },
      {
      spotId: 3,
      userId: 6,
      review: 'king likes to sleep here sometimes',
      stars: 5
      },
      {
      spotId: 3,
      userId: 1,
      review: 'could be bigger but not bad',
      stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'great place if you want peace and quiet',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'awesome place',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Best place in the house.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 5,
        review: 'I like it',
        stars: 3
      },
      {
        spotId: 8,
        userId: 4,
        review: 'Cold, but roomy.',
        stars: 1
      },
      {
        spotId: 10,
        userId: 3,
        review: 'haha',
        stars: 3
      },
      {
        spotId: 10,
        userId: 5,
        review: 'More comfortable than it looks.',
        stars: 3
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 3, 4, 5, 6] }
    }, {});
  }
};
