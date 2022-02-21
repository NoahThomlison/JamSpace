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
        coordinates: req.body.coordinates
      };
      const date = new Date();
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

  // This may not work correctly
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
      const adResponse = await AdsDAO.deleteAd(adId);

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
