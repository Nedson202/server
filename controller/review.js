import businesses from '../model/business';
import * as businesFilter from '../middlewares/business-filterer';
/**
  *
  *Review class to handle review posting and getting all reviews for a business
  *@class
  *
*/
class Reviews {
  /**
    *
    *post reviews for a business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static postReview(req, res) {
    const { reviewer, message } = req.body;
    const businessId = parseInt(req.params.businessId, 10);

    businesses.forEach((business) => {
      if (business.id === businessId) {
        business.reviews.push({
          reviewer,
          message
        });
        res.status(201).json({
          message: 'Review posted successfully',
          error: false
        });
      }
    });

    return res.status(404).send({
      message: 'Business not found, no review posted',
      error: true
    });
  }
  /**
    *
    *gets all reviews under a business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static getReview(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    businesses.forEach((business) => {
      if (business.id === businessId) {
        res.status(200).json(business.reviews);
      }
    });

    return res.status(404).send({
      message: 'Business not found, no review gotten',
      error: true
    });
  }
}

export default Reviews;
