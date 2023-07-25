const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const properAuth = async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (booking.userId !== req.user.id) {
        const err = new Error("Booking must belong to the current user");
        err.title = "Booking must belong to the current user";
        err.status = 401;
        next(err)
    } 
      next()
  }


const findBooking = async (req, res, next) => {
    const err = new Error("Booking couldn't be found")
    const booking = await Booking.findByPk(req.params.bookingId);
   if (!booking) {
      err.status = 404;
      err.title = "Couldn't find a Booking with the specified id";
      next(err)
    }
    next()
  }

router.put('/:bookingId', requireAuth, findBooking, properAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);

    const err = new Error();
    const errors = [];
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    // if (booking.userId !== req.user.id) {
    //   err.message = "Booking must belong to the current user";
    //   err.status = 400;
    //   next(err)
    // }
    if (date2 < date1) {
      err.title = "Body validation errors"
      err.message = "Validation error";
      err.status = 400;
      errors.push("endDate cannot come before startDate");
    } if (date2 < date1) {
        err.title = "Can't edit a booking that's past the end date"
        err.message = "Past bookings can't be modified";
        err.status = 403;
        next(err);
      }       
   
  
    if (errors.length) {
      err.errors = errors;
      next(err)
    }

    booking.set({
        startDate, endDate
    })
    await booking.save()
    res.json(booking)
  })

  router.delete('/:bookingId', requireAuth, findBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const spot = await booking.getSpot();

    

    const date1 = new Date(booking.startDate);

    if (booking.userId !== req.user.id || req.user.id !== spot.ownerId) {
        const err = new Error("Booking or Spot must belong to the current user");
        err.title = "Booking or Spot must belong to the current user";
        err.status = 401;
        next(err)
    } if (date1 <= Date()) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.title = "Bookings that have been started can't be deleted";
        err.status = 403;
        next(err)
    }


    await booking.destroy()
    res.status(200)
    res.json("Successfully deleted")
  })


module.exports = router;
