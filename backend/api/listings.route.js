import express from 'express';
import ListingsCtrl from './listings.controller.js';

const router = express.Router();

router.route('/').get(ListingsCtrl.apiGetListings);

export default router;
