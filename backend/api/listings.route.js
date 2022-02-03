import express from 'express';
import ListingsCtrl from './listings.controller.js';
import AdsCtrl from './ads.controller.js';

const router = express.Router();

router.route('/').get(ListingsCtrl.apiGetListings);
router.route('/id/:id').get(ListingsCtrl.apiGetListingById);

router
  .route('/ad')
  .post(AdsCtrl.apiPostAd)
  .put(AdsCtrl.apiUpdateAd)
  .delete(AdsCtrl.apiDeleteAd);

export default router;
