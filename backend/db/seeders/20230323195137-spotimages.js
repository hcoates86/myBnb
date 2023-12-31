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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://i.ibb.co/3mQz0mq/bathroom.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/183tWXm/bathroom2.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/ygmJvDJ/office1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/gggy1x9/office2.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },{
        spotId: 2,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },{
        spotId: 2,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/f40Ds35/orangeroom.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.ibb.co/7W5bQCS/garage2-1.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'http://hips.hearstapps.com/hmg-prod/images/guest-bedroom-ideas-hbx080122laurennelson-008-2-1663862856.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://image.chewy.com/is/image/catalog/172406_MAIN._AC_SL1200_V1625252295_.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i1.wp.com/www.theandersonstudio.com/wp-content/uploads/2021/08/Resized-Anderson_Kiawah_230.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.trees.com/wp-content/uploads/files/inline-images/Ultimate-Treehouse-by-btm.jpg',
        preview: true
      },{
        spotId: 8,
        url: 'https://i.ibb.co/2y8tBYH/garage1.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.ibb.co/7yq4G5W/garage1-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.ibb.co/jL3VKbh/garage2.jpg',
        preview: false
      },{
        spotId: 8,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://www.lawnstarter.com/blog/wp-content/uploads/2020/10/lattice-fence-top-flickr-ccbysa2.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://i.ibb.co/v32JVmZ/closet1.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://i.ibb.co/p3tx3KM/closet2.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://i.ibb.co/vvBssvb/NoImage.png',
        preview: false
      },
      
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
