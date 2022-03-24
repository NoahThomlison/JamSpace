import express from 'express';
import ListingsCtrl from './listings.controller.js';
import AdsCtrl from './ads.controller.js';

const router = express.Router();

// route to get all listings
router.route('/').get(ListingsCtrl.apiGetListings);

// route to get a specific listing
router.route('/id/:id').get(ListingsCtrl.apiGetListingById);

// route to post, update and delete a specific listing
router
  .route('/ad')
  .post(AdsCtrl.apiPostAd)
  .put(AdsCtrl.apiUpdateAd)
  .delete(AdsCtrl.apiDeleteAd);

export default router;
