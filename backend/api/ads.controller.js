import AdsDAO from '../dao/adsDAO.js';

export default class AdsController {
  static async apiPostAd(req, res, next) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const instrumentType = req.body.instrument_type;
      const brand = req.body.brand;
      const condition = req.body.condition;
      const price = {
        daily: req.body.daily,
        weekly: req.body.weekly,
        monthly: req.body.monthly,
      };
      const deposit = req.body.deposit;
      const images = req.body.images;
      const userId = req.body.user_id;
      const userInfo = {
        name: req.body.name,
        image: req.body.user_img,
        about: req.body.user_about,
      };
      const address = {
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postal_code: req.body.postal_code,
      };
      const date = new Date();
      console.log(req.body);
      const adResponse = await AdsDAO.addAd(
        title,
        description,
        instrumentType,
        brand,
        condition,
        price,
        deposit,
        images,
        userId,
        userInfo,
        address,
        date
      );
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateAd(req, res, next) {
    try {
      const adId = req.body.ad_id;
      const title = req.body.title;
      const description = req.body.description;
      const userId = req.body.user_id;
      const date = new Date();

      const adResponse = await AdsDAO.updateAd(
        adId,
        title,
        description,
        userId,
        date
      );
      var { error } = adResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (adResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update ad - user may not be original poster'
        );
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteAd(req, res, next) {
    try {
      const adId = req.query.id;
      const userId = req.body.user_id;
      console.log(adId);
      const adResponse = await AdsDAO.deleteAd(adId, userId);

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

/*
title : "Fender Guitar"
description :"Beautiful Fender Guitar with all the wonderful things musicians love."
instrument_type:"Electric Guitar"
brand:"Fender"
condition:"Mint"
price:Object
  daily:30
  weekly:75
  monthly:175
security_deposit:200
images:Array
  0:"https://picsum.photos/id/1025/200/300.jpg"
  1:"https://picsum.photos/id/237/200/300.jpg"
host:Object
host_id:61fa160127f71329bafba7d2
host_name:"Tyler Shelton"
host_image:"https://i.picsum.photos/id/1/5616/3744.jpg"
host_location:"Hamilton, Ontario, Canada"
host_about:"Loves music making things."
address:Object
  city:"Hamilton"
  province:"Ontario"
  country:"Canada"
  coordinates:Array
    0:"43.244148750557365"
    1:"-79.78604591496422"
created_on:"2022-02-01T05:00:00.000+00:00"
updated_on:"2022-02-01T06:30:00.000+00:00"
*/
