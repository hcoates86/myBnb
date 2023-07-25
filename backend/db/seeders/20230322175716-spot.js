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
    options.tableName = 'spots';
    return queryInterface.bulkInsert(options, [
      { ownerId: 1,
        address: '555 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 252.5,
        lng: 3344.3,
        name: 'Hallway Bathroom',
        description: "Not very spacey but includes a toilet, sink, and even a mirror!",
        price: 255
      },
      { ownerId: 2,
        address: '555 Fake St., Rm. 6',
        city: 'Springfield',
        state: 'OH',
        country: 'United States',
        lat: 255.5,
        lng: 3373.3,
        name: "Mom's Office",
        description: "A beautiful space with a couch and a hardwood desk. Please don't use the laptop.",
        price: 555
      },
      { ownerId: 3,
        address: '555 Fake St., Rm. 3',
        city: 'Springfield',
        state: 'OH',
        country: 'United States',
        lat: 772.87875,
        lng: 773.793,
        name: 'Orange Bedroom',
        description: "One twin-sized bed in a very orange room. No private bathroom.",
        price: 599
      },
      { ownerId: 4,
        address: '123 Riverside Road',
        city: 'Rio',
        state: 'Brazil',
        country: 'Brazil',
        lat: -220.5268,
        lng: -303.3246,
        name: 'Beautiful House',
        description: "One house, everything you need.",
        price: 777
      },
      { ownerId: 6,
        address: '555 Fake St.',
        city: 'Springfield',
        state: 'OH',
        country: 'United States',
        lat: 232.524564,
        lng: -333.33765,
        name: "King's Bed",
        description: "Ok so it's just the one bed but it's great to curl up in. Can be moved anywhere in the living room.",
        price: 49
      },
      { ownerId: 2,
        address: '555 Fake St., Rm. 1',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 272.524564,
        lng: -373.33765,
        name: 'Master Bedroom',
        description: 'Features a Queen bed and 75" TV, just please no eating crackers in bed.',
        price: 9999
      },
      { ownerId: 1,
        address: '555.5 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 283.524564,
        lng: -380.33765,
        name: 'Tree house',
        description: "Second story, must be able to climb ladder. Sleeping bag and snacks included.",
        price: 4899
      },
      { ownerId: 5,
        address: '555 Fake St., Rm. 5',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 272.524564,
        lng: -373.33765,
        name: 'Garage',
        description: 'Plenty of space',
        price: 899
      },
      { ownerId: 1,
        address: '555.5 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 280.524564,
        lng: -370.33765,
        name: 'Backyard',
        description: "Privacy fence and a great view of the sky.",
        price: 4899
      },
      { ownerId: 1, //10
        address: '555 Fake St.',
        city: 'Springfield',
        state: 'OR',
        country: 'United States',
        lat: 283.524564,
        lng: -380.33765,
        name: 'My room closet',
        description: "Might not seem like much but there's enough room to hang your clothes and sleep.",
        price: 899
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['559 Fake St.', '555 Fake St.', '123 Riverside Road'] }
    }, {});
  }
};
