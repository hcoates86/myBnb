const express = require('express');
const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();

const properAuth = async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (review.userId !== req.user.id) {
        const err = new Error("Review must belong to the current user");
        err.title = "Review must belong to the current user";
        err.status = 401;
        next(err)
    } 
      next()
  }

const findReview = async (req, res, next) => {
    const err = new Error("Review couldn't be found")
    const review = await Review.findByPk(req.params.reviewId);
   if (!review) {
      err.status = 404;
      err.title = "Couldn't find a Review with the specified id";
      next(err)
    }
    next()
  }

router.post('/:reviewId/images', requireAuth, findReview, properAuth, async (req, res, next) => {
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    const err = new Error();
    // if (review.userId !== req.user.id) {
    //     err.title = "Review must belong to the current user";
    //     err.message = "Review must belong to the current user";
    //     err.status = 403;
    //     err.statusCode = 403;
    //     next(err)
    // } 
    if (!url) {
        err.title = "Body validation error";
        err.message = "Url is required";
        err.status = 400;
        next(err)
    }

    const rImageCount = await review.countReviewImages();
    if (rImageCount >= 10) {
        err.title = "Cannot add any more images because there is a maximum of 10"
        err.message = "Maximum number of images for this resource was reached";
        err.status = 403;
        next(err)
    }


    const rImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    const rImageInfo = await ReviewImage.findByPk(rImage.id, {attributes: ['id', 'url']})

    res.json(rImageInfo)
})


router.put('/:reviewId', requireAuth, findReview, properAuth, async (req, res, next) => {
    const { review, stars } = req.body;
    const currReview = await Review.findByPk(req.params.reviewId);

    const errors = [];
    const err = new Error("Validation Error");
    err.title = "Body validation error";
    err.status = 400;
    if (!review) errors.push("Review text is required");
    if (!stars || typeof stars !== 'number' || stars < 1 || stars > 5) errors.push("Stars must be an integer from 1 to 5");
    if (errors.length) {
        err.errors = errors;
        next(err)
    }

    currReview.set({ review, stars })
    await currReview.save()

    res.json(currReview)
})

router.delete('/:reviewId', requireAuth, findReview, properAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy()
    res.status(200)
    res.json("Successfully deleted")
})


module.exports = router;