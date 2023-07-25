const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();




router.delete('/:rImageId', requireAuth, async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.rImageId)
    const review = await image.getReview();
    if (!image) {
        const err = new Error("Review Image couldn't be found")
        err.status = 404;
        err.title = "Couldn't find a Review Image with the specified id";
        err.errors = { message:  "Review Image couldn't be found"};
        next(err)
    }
    if (req.user.id !== review.userId) {
        const err = new Error("Review must belong to the current user")
        err.status = 401;
        err.title = "Authentication required";
        err.errors = { message:  "Review must belong to the current user"};
        next(err)
    }

    await image.destroy()
    res.status(200)
    res.json("Successfully deleted")



  })






module.exports = router;