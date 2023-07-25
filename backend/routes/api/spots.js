const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const bodyVal = async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const errors = [];
  const err = new Error();
  err.title = "Body validation error";
  err.message = "Validation Error";
  err.status = 400;
  if (!name) errors.push("Name is required");
  else if (name.length > 50) errors.push("Name must be less than 50 characters");
  if (!address) errors.push("Street address is required");
  if (!city) errors.push("City is required");
  if (!state) errors.push("State is required");
  if (!country) errors.push("Country is required");
  // if (!lat || typeof lat !== 'number') errors.push("Latitude is not valid");
  // if (!lng || typeof lng !== 'number') errors.push("Longitude is not valid");
  if (!description) errors.push("Description is required");
  if (!price) errors.push("Price per day is required");
  if (errors.length) {
    err.errors = errors;
    next(err)
  } next()
}


const properAuth = async (req, res, next) => {
  const err = new Error()
  const spot = await Spot.findByPk(req.params.spotId);
  if (req.user.id !== spot.ownerId) {
    err.status = 401;
    err.title = "Authentication required";
    err.message = "Spot must belong to the current user";
    next(err)
  }
    next()
}

const findSpot = async (req, res, next) => {
  const err = new Error()
  const spot = await Spot.findByPk(req.params.spotId);
 if (!spot) {
    err.status = 404;
    err.title = "Couldn't find a Spot with the specified id";
    err.message = "Spot couldn't be found";
    // err.statusCode = 404;
    next(err)
  }
  next()
}

//get all spots
router.get('/', async (req, res, next) => {

  const spots = await Spot.findAll({raw: true})
  const spotsArray = [];

  for (let spot of spots) {
    let avgStarRating;
    const currSpot = await Spot.findByPk(spot.id);
    const reviewCount = await currSpot.countReviews();
    if (!reviewCount) { 
       avgStarRating = 'No reviews yet'
    } else {
      const avg = await Review.sum('stars', { where: { spotId: spot.id }});
       avgStarRating = avg / reviewCount;
       avgStarRating = Number.parseFloat(avgStarRating).toFixed(1);
    }
    let image = await currSpot.getSpotImages({ attributes: ['url'], where: { preview: true }})
    if (!image || !image.length) image = 'https://i.ibb.co/jLWm3Cq/NoImage.png';

    spot.avgRating = avgStarRating;
    spot.previewImage = image[0].url || image;
    
    spotsArray.push(spot)
  }

  res.json({Spots: spotsArray})
})

router.post('/:spotId/images', requireAuth, findSpot, properAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const newImage = await SpotImage.create({
    spotId: req.params.spotId,
    url, preview
  })
  const newImageInfo = await SpotImage.findByPk(newImage.id, {attributes:{exclude:['spotId', 'createdAt', 'updatedAt']}})

  res.json(newImageInfo)

})

router.get('/:spotId/reviews', findSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const reviews = await spot.getReviews({raw: true});
  let arr = [];
  if (!reviews || !reviews.length) arr = null; 
  for (let review of reviews) {
    const currReview = await Review.findByPk(review.id);
    let rImages = await currReview.getReviewImages({attributes: ['id', 'url']});
    if (!rImages || !rImages.length) rImages = null;

    review.User = await User.findByPk(review.userId, {attributes: ['id', 'firstName', 'lastName']});
    review.ReviewImages = rImages;

    arr.push(review)
  }

  res.json({Reviews: arr})
})


router.post('/:spotId/reviews', requireAuth, findSpot, async (req, res, next) => {
const { review, stars } = req.body;
const spot = await Spot.findByPk(req.params.spotId);
const revs = await spot.getReviews();

const errors = [];
const err = new Error();

err.title = "Body validation error";
err.message = "Validation Error";
err.status = 400;
if (!review) errors.push("Review text is required");
if (!stars || typeof stars !== 'number' || stars < 1 || stars > 5) errors.push("Stars must be an integer from 1 to 5");
if (errors.length) {
  err.errors = errors;
  next(err)
}

if (revs && revs.length) {
  for (let one of revs) {
   if (one.userId === req.user.id) {
      err.title = "Review from the current user already exists for the Spot";
      err.message = "User already has a review for this spot";
      err.status = 403;
      next(err)
    }
  }
}

const newReview = await Review.create({
  spotId: req.params.spotId,
  userId: req.user.id,
  review, stars
})

res.status(201);
res.json(newReview)

})

router.get('/:spotId/bookings', requireAuth, findSpot, async (req, res, next) => {
  const arr = [];
  const spot = await Spot.findByPk(req.params.spotId);
  const bookings = await spot.getBookings({attributes: ['spotId', 'startDate', 'endDate']});

  if (req.user.id !== spot.ownerId){
    res.json({Bookings: bookings})
  } else {

  const bookings2 = await spot.getBookings({raw: true});
  for (let book of bookings2) {
    const user = await User.findByPk(book.userId, {raw: true, attributes: ['id', 'firstName', 'lastName']});
    book.User = user;
    arr.push(book)
  }
  res.json({Bookings: arr})
}
})

router.post('/:spotId/bookings', requireAuth, findSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  const { startDate, endDate } = req.body;
  // toDateString()
  const err = new Error();
  const errors = [];
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  if (spot.ownerId === req.user.id) {
    err.message = "You can't create a booking for a spot you own.";
    err.status = 400;
    errors.push("No");
  }
  if (date2 <= date1) {
    err.message = "Validation error";
    err.status = 400;
    errors.push("endDate cannot be on or before startDate");
  } 
  // if (date1.getTime() === date2.getTime()) {

  // }

  if (errors.length) {
    err.errors = errors;
    next(err)
  }

  const booking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate, endDate
  })

  res.json(booking)

})


router.get('/:spotId', findSpot, async (req, res, next) => {
  const id = req.params.spotId;
  const spots = await Spot.findByPk(id);

  const reviewCount = await spots.countReviews();
  const images = await spots.getSpotImages({ attributes: ['id', 'url', 'preview']});
  const owner = await spots.getUser({ attributes: ['id', 'firstName', 'lastName']});
  
  const avg = await Review.sum('stars', { where: { spotId: id}});
  const avgStarRating = avg / reviewCount;

  let spotsCopy = {...spots}

  let spots2 = spotsCopy.dataValues;
  
  spots2.numReviews = reviewCount;
  spots2.avgStarRating = avgStarRating;
  spots2.SpotImages = images;
  spots2.Owner = owner;

  res.json(spots2)
})



//create a new spot
router.post('/new', requireAuth, bodyVal, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.create({ 
    ownerId: req.user.id, //makes current user the owner id
    address, city, state, country, lat, lng, name, description, price })

  res.status(201);
  res.json(spot)
//should it not allow multiple posts for the same spot?
})


router.put('/:spotId', requireAuth, findSpot, properAuth, bodyVal, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  spot.set({
    address, city, state, country, lat, lng, name, description, price
  })
  await spot.save()
  res.json(spot)
})


router.delete('/:spotId', requireAuth, findSpot, properAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  await spot.destroy()
  res.status(200)
  res.json("Successfully deleted")
})



module.exports = router;