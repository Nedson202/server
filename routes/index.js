import Auth from '../auth/user';
import Businesses from '../controller/business';
import Reviews from '../controller/review';
import validator from '../middlewares/validator';
import * as businesFilter from '../middlewares/business-filterer';
import errorHandler from '../middlewares/error-handler';


export default (route) => {
  route.post('/api/v1/auth/signup', validator.userSignup, errorHandler, Auth.createUser);
  route.post('/api/v1/auth/login', validator.userLogin, errorHandler, Auth.logUser);
  route.post('/api/v1/businesses', validator.registerBusiness, errorHandler, Businesses.createBusiness);
  route.get('/api/v1/businesses', businesFilter.sortQuery, Businesses.getBusiness);
  route.get('/api/v1/businesses/:businessId', Businesses.getOneBusiness);
  route.put('/api/v1/businesses/:businessId', Businesses.updateBusiness);
  route.delete('/api/v1/businesses/:businessId', businesFilter.filterToDelete, Businesses.deleteBusiness);
  route.post('/api/v1/businesses/:businessId/reviews/', validator.reviews, errorHandler, Reviews.postReview);
  route.get('/api/v1/businesses/:businessId/reviews/', Reviews.getReview);
};
