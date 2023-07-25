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
    options.tableName = 'reviewimages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'review.jpg'
      },
      {
        reviewId: 1,
        url: 'review.jpg'
      },
      {
        reviewId: 2,
        url: 'review.jpg'
      },
      {
        reviewId: 2,
        url: 'review.jpg'
      },
      {
        reviewId: 3,
        url: 'review.jpg'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'reviewimages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: 'img.png'
    }, {});
  }
};
